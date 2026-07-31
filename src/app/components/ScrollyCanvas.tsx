"use client";

import { useEffect, useRef, useCallback, cloneElement } from "react";
import {
  useScroll,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";

// ─── Constants ───────────────────────────────────────────────────────────────
const TOTAL_FRAMES = 60;

/**
 * Genera las rutas públicas de todos los fotogramas de la secuencia.
 * Nombres: ezgif-frame-001.png → ezgif-frame-060.png
 */
const FRAME_PATHS: string[] = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const n = String(i + 1).padStart(3, "0");
  return `/sequence/ezgif-frame-${n}.png`;
});

// ─── Types ────────────────────────────────────────────────────────────────────
interface ScrollyCanvasProps {
  children?: React.ReactElement<{ scrollYProgress: MotionValue<number> }>;
}

// ─── Helper: draw with object-fit: cover logic ────────────────────────────────
function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  canvasW: number,
  canvasH: number
): void {
  const imgAspect = img.naturalWidth / img.naturalHeight;
  const canvasAspect = canvasW / canvasH;

  let sx = 0,
    sy = 0,
    sw = img.naturalWidth,
    sh = img.naturalHeight;

  if (imgAspect > canvasAspect) {
    sw = img.naturalHeight * canvasAspect;
    sx = (img.naturalWidth - sw) / 2;
  } else {
    sh = img.naturalWidth / canvasAspect;
    sy = (img.naturalHeight - sh) / 2;
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvasW, canvasH);
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ScrollyCanvas({ children }: ScrollyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  // ── Scroll progress (0 → 1) scoped to this container ──────────────────────
  const { scrollYProgress } = useScroll({ target: containerRef });

  // ── Dibujar un fotograma específico en el canvas ──────────────────────────
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawImageCover(ctx, img, canvas.width, canvas.height);
      rafRef.current = null;
    });
  }, []);

  // ── Redimensionar el canvas para llenar siempre la ventana ────────────────
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);

    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // ── Precargar TODOS los fotogramas al montar ──────────────────────────────
  useEffect(() => {
    const images: HTMLImageElement[] = [];

    FRAME_PATHS.forEach((src, i) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (i === 0) {
          drawFrame(0);
        }
      };
      img.onerror = () => {
        console.warn(`[ScrollyCanvas] No se pudo cargar el fotograma: ${src}`);
      };
      img.src = src;
      images[i] = img;
    });

    imagesRef.current = images;

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [resizeCanvas, drawFrame]);

  // ── Mapear progreso del scroll → índice de fotograma ─────────────────────
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const rawIndex = Math.floor(latest * TOTAL_FRAMES);
    const clampedIndex = Math.max(0, Math.min(rawIndex, TOTAL_FRAMES - 1));

    if (clampedIndex !== currentFrameRef.current) {
      currentFrameRef.current = clampedIndex;
      drawFrame(clampedIndex);
    }
  });

  return (
    /**
     * Contenedor externo: 500vh da la distancia de scroll.
     * El sticky fija el canvas a la ventana durante el recorrido.
     */
    <div
      ref={containerRef}
      className="relative"
      style={{ height: "500vh" }}
      aria-label="Animación de scroll — secuencia de imágenes"
    >
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          className="block"
          style={{
            display: "block",
            backgroundColor: "#F8F8F3",
          }}
          aria-hidden="true"
        />

        {/* Overlay slot — capas de texto con parallax */}
        {children
          ? cloneElement(children, { scrollYProgress })
          : children}
      </div>
    </div>
  );
}
