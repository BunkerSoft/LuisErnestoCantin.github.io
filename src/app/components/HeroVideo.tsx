"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const POSTER_SRC = "/sequence/ezgif-frame-001.png";
const AUDIO_SRC = "/sonido.weba";

/**
 * Videos que se reproducen secuencialmente en la pantalla inicial.
 * Ciclo: 01.mp4 → 02.mp4 → 03.mp4 → 04.mp4 → 01.mp4 ...
 */
const VIDEOS: string[] = [
  "/01.mp4",
  "/videos/02.mp4",
  "/videos/03.mp4",
  "/videos/04.mp4",
];

/* ─── Icons ─────────────────────────────────────────────────────────────────── */

function SpeakerIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 5 6 9H2v6h4l5 4V5Z" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function MutedIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 5 6 9H2v6h4l5 4V5Z" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

/* ─── Hero video: reproducción secuencial de 01 → 02 → 03 → 04 ─────────────── */

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const indexRef = useRef<number>(0);
  const [nextSrc, setNextSrc] = useState<string>(VIDEOS[1]);
  const [isPlaying, setIsPlaying] = useState(false);

  // ── Al terminar un video, pasar al siguiente secuencialmente ───────────
  const handleEnded = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    indexRef.current = (indexRef.current + 1) % VIDEOS.length;
    video.src = VIDEOS[indexRef.current];
    video.load();
    video.play().catch(() => {});

    // Preload del siguiente video (oculto) para evitar parpadeo blanco
    setNextSrc(VIDEOS[(indexRef.current + 1) % VIDEOS.length]);
  }, []);

  // Reproducción inicial
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.src = VIDEOS[0];
    video.load();
    video.play().catch(() => {});
  }, []);

  const toggleAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.src = "";
      }
    };
  }, []);

  return (
    <section
      className="relative h-dvh w-full overflow-hidden"
      style={{ backgroundColor: "#F8F8F3" }}
      aria-label="Video de presentación"
    >
      <video
        ref={videoRef}
        poster={POSTER_SRC}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ backgroundColor: "#F8F8F3" }}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleEnded}
        aria-hidden="true"
      />

      {/* Preload del siguiente video (oculto) para eliminar parpadeo blanco */}
      <video
        src={nextSrc}
        muted
        playsInline
        preload="auto"
        className="hidden"
        aria-hidden="true"
      />

      <audio ref={audioRef} src={AUDIO_SRC} preload="auto" loop />

      {/* ── Overlays ─────────────────────────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col items-center justify-between pointer-events-none px-6 py-24 md:py-28">
        {/* ── Información principal sobre el video ───────────────────── */}
        <div className="flex flex-col items-center text-center max-w-4xl">
          <motion.h1
            className="font-black text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-none tracking-tighter"
            style={{ color: "#1A1A2E" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          >
            Luis Ernesto
            <br />
            <span className="gradient-text">Cantin Oviedo.</span>
          </motion.h1>

          <motion.p
            className="mt-5 text-base md:text-xl font-medium tracking-wide"
            style={{ color: "rgba(26,26,46,0.65)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          >
            Developer | Backend | Middleware | Frontend
          </motion.p>

          <motion.p
            className="mt-4 flex flex-col md:flex-row items-center gap-1 md:gap-3 text-sm md:text-base font-light"
            style={{ color: "rgba(26,26,46,0.5)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1 }}
          >
            <a
              href="mailto:ingenieroluisernestocantin@hotmail.com"
              className="pointer-events-auto transition-colors duration-200"
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#1A1A2E")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "rgba(26,26,46,0.5)")
              }
            >
              ingenieroluisernestocantin@hotmail.com
            </a>
            <span
              className="hidden md:inline w-1 h-1 rounded-full"
              style={{ backgroundColor: "rgba(26,26,46,0.25)" }}
              aria-hidden="true"
            />
            <span>+57 300 650 2320</span>
          </motion.p>

          <motion.a
            href="/CV_Luis_Ernesto_Cantin_EN.pdf"
            download
            className="pointer-events-auto mt-8 inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-medium text-sm transition-all duration-300"
            style={{
              backgroundColor: "#1A1A2E",
              color: "#F8F8F3",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.2 }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "#2a2a3e";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "#1A1A2E";
            }}
          >
            Descarga mi CV
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5"
                stroke="#F8F8F3"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>
        </div>

        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span
            className="text-xs tracking-[0.2em] uppercase"
            style={{ color: "rgba(26,26,46,0.4)" }}
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
              stroke="rgba(26,26,46,0.4)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>

      <motion.button
        id="toggleAudioBtn"
        type="button"
        onClick={toggleAudio}
        aria-label={isPlaying ? "Silenciar audio" : "Activar audio"}
        aria-pressed={isPlaying}
        className="pointer-events-auto absolute bottom-6 right-6 md:bottom-10 md:right-10 flex items-center justify-center w-12 h-12 rounded-full glass-card transition-transform duration-300"
        style={{ color: "#1A1A2E" }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        {isPlaying ? <MutedIcon /> : <SpeakerIcon />}
      </motion.button>
    </section>
  );
}
