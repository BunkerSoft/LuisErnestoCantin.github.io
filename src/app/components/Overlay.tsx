"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

interface OverlayProps {
  scrollYProgress?: MotionValue<number>;
}

interface OverlaySectionProps {
  scrollYProgress: MotionValue<number>;
  children: React.ReactNode;
  range: [number, number, number, number];
  parallaxPx?: number;
  align?: "left" | "center" | "right";
  className?: string;
}

function OverlaySection({
  scrollYProgress,
  children,
  range,
  parallaxPx = 60,
  align = "center",
  className = "",
}: OverlaySectionProps) {
  const [fadeIn, peakStart, peakEnd, fadeOut] = range;

  const opacity = useTransform(
    scrollYProgress,
    [fadeIn, peakStart, peakEnd, fadeOut],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [fadeIn, fadeOut],
    [parallaxPx, -parallaxPx]
  );

  const alignClass = {
    left: "items-start text-left pl-6 md:pl-16 lg:pl-24",
    center: "items-center text-center",
    right: "items-end text-right pr-6 md:pr-16 lg:pr-24",
  }[align];

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-0 flex flex-col justify-center pointer-events-none ${alignClass} ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  const fallback = useScroll({ offset: ["start start", "end end"] });
  const progress = scrollYProgress ?? fallback.scrollYProgress;

  return (
    <div
      className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
      aria-label="Capas de texto del scroll"
    >
      {/* ── Section 1 (0%): name + role, centered ─────────────────────── */}
      <OverlaySection
        scrollYProgress={progress}
        range={[0, 0.04, 0.26, 0.33]}
        align="center"
        parallaxPx={40}
      >
        <motion.span
          className="inline-block text-xs md:text-sm font-medium tracking-[0.3em] uppercase mb-4"
          style={{ color: "rgba(26,26,46,0.5)" }}
        >
          Luis Ernesto Cantin Oviedo
        </motion.span>

        <h1
          className="font-black text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-none tracking-tighter"
          style={{ color: "#1A1A2E" }}
        >
          Mi nombre.
          <br />
          <span className="gradient-text">Desarrollador creativo.</span>
        </h1>

        <motion.div
          className="mt-10 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span
            className="text-xs tracking-[0.2em] uppercase"
            style={{ color: "rgba(26,26,46,0.35)" }}
          >
            Scroll
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M10 4v12M5 11l5 5 5-5"
              stroke="rgba(26,26,46,0.35)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </OverlaySection>

      {/* ── Section 2 (30%): left aligned ─────────────────────────────── */}
      <OverlaySection
        scrollYProgress={progress}
        range={[0.34, 0.40, 0.58, 0.66]}
        align="left"
        parallaxPx={50}
      >
        <span
          className="text-xs md:text-sm font-medium tracking-[0.25em] uppercase mb-3 block"
          style={{ color: "rgba(26,26,46,0.45)" }}
        >
          01 / Story
        </span>
        <h2
          className="font-bold text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight max-w-lg"
          style={{ color: "#1A1A2E" }}
        >
          Creo
          <br />
          <span className="gradient-text">experiencias digitales.</span>
        </h2>
        <p
          className="mt-4 text-base md:text-lg font-light max-w-md"
          style={{ color: "rgba(26,26,46,0.55)" }}
        >
          Interfaces que cuentan historias y convierten una idea en un producto memorable.
        </p>
      </OverlaySection>

      {/* ── Section 3 (60%): right aligned ────────────────────────────── */}
      <OverlaySection
        scrollYProgress={progress}
        range={[0.67, 0.73, 0.92, 1]}
        align="right"
        parallaxPx={50}
      >
        <span
          className="text-xs md:text-sm font-medium tracking-[0.25em] uppercase mb-3 block"
          style={{ color: "rgba(26,26,46,0.45)" }}
        >
          02 / Story
        </span>
        <h2
          className="font-bold text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight max-w-lg"
          style={{ color: "#1A1A2E" }}
        >
          Uniendo
          <br />
          <span className="gradient-text">diseño e ingeniería.</span>
        </h2>
        <p
          className="mt-4 text-base md:text-lg font-light max-w-md ml-auto"
          style={{ color: "rgba(26,26,46,0.55)" }}
        >
          Donde la estética encuentra la lógica. Producto, calidad y detalle en cada capa.
        </p>
      </OverlaySection>
    </div>
  );
}
