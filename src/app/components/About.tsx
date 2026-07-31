"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import type { Easing } from "framer-motion";

/* ─── Social icons (inline SVG, sin dependencias externas) ─────────────────── */

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

/* ─── Social links data ─────────────────────────────────────────────────────── */

const SOCIAL_LINKS: {
  href: string;
  label: string;
  color: string;
  icon: React.ReactNode;
}[] = [
  {
    href: "https://wa.me/573006502320",
    label: "WhatsApp",
    color: "#25D366",
    icon: <WhatsAppIcon />,
  },
  {
    href: "tel:+573006502320",
    label: "Teléfono",
    color: "#3B82F6",
    icon: <PhoneIcon />,
  },
  {
    href: "https://www.linkedin.com/in/luis-ernesto-cantin-oviedo-83353163/",
    label: "LinkedIn",
    color: "#0A66C2",
    icon: <LinkedInIcon />,
  },
  {
    href: "https://github.com/BunkerSoft",
    label: "GitHub",
    color: "#1A1A2E",
    icon: <GitHubIcon />,
  },
  {
    href: "https://www.facebook.com/LuisErnestoCantinOviedo/",
    label: "Facebook",
    color: "#1877F2",
    icon: <FacebookIcon />,
  },
  {
    href: "mailto:ingenieroluisernestocantin@hotmail.com",
    label: "Email",
    color: "#EF4444",
    icon: <EmailIcon />,
  },
];

const TYPEWRITER_WORDS = ["Desarrollador Full Stack | .NET"];

/* ─── Component ─────────────────────────────────────────────────────────────── */

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-15%" });

  // ── Parallax sutil sobre los bloques de aurora ──────────────────────────
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const yBlob1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yBlob2 = useTransform(scrollYProgress, [0, 1], [-40, 80]);
  const yPhoto = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // ── Efecto typewriter sobre la frase principal ─────────────────────────
  const [typed, setTyped] = useState("");
  useEffect(() => {
    const text = TYPEWRITER_WORDS[0];
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, 55);
    return () => clearInterval(timer);
  }, []);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as Easing,
      delay,
    },
  });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20 overflow-hidden"
      style={{ backgroundColor: "#F8F8F3" }}
      aria-labelledby="about-heading"
    >
      {/* ── Aurora de fondo ────────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        className="absolute -top-32 -left-24 w-96 h-96 rounded-full opacity-50"
        style={{
          background: "radial-gradient(circle, #BFEFF3 0%, transparent 70%)",
          filter: "blur(60px)",
          y: yBlob1,
        }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -bottom-40 -right-24 w-[28rem] h-[28rem] rounded-full opacity-50"
        style={{
          background: "radial-gradient(circle, #DDD8F5 0%, transparent 70%)",
          filter: "blur(60px)",
          y: yBlob2,
        }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full opacity-40"
        style={{
          background: "radial-gradient(circle, #FFF1A8 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div className="relative max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-14 lg:gap-20 items-center">
        {/* ── Columna izquierda: foto + QR ─────────────────────────────── */}
        <div className="flex flex-col items-center lg:items-start">
          <motion.header
            className="mb-10 lg:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="text-xs font-medium tracking-[0.3em] uppercase block mb-4"
              style={{ color: "rgba(26,26,46,0.35)" }}
            >
              Sobre mí
            </span>
            <h2
              id="about-heading"
              className="text-4xl md:text-6xl font-black tracking-tight"
              style={{ color: "#1A1A2E" }}
            >
              Perfil <span className="gradient-text">profesional.</span>
            </h2>
          </motion.header>

          {/* ── Foto con anillo gradiente animado ──────────────────────── */}
          <motion.div
            className="relative"
            style={{ y: yPhoto }}
            {...fadeUp(0.15)}
          >
            <div
              aria-hidden="true"
              className="absolute -inset-2 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, #BFEFF3, #DDD8F5, #FFF1A8, #DCEFAF, #BFEFF3)",
                animation: "spinSlow 8s linear infinite",
              }}
            />
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full p-1.5 glass-card overflow-hidden">
              <img
                src="/FotoGrafia.png"
                alt="Luis Ernesto Cantin"
                width={192}
                height={192}
                className="w-full h-full rounded-full object-cover"
                style={{ border: "3px solid rgba(255,255,255,0.8)" }}
              />
            </div>

            {/* Badge de disponibilidad */}
            <motion.span
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap glass-card"
              style={{ color: "#1A1A2E" }}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"
                aria-hidden="true"
              />
              Disponible para proyectos
            </motion.span>
          </motion.div>

          {/* ── Tarjeta de contacto con QR ─────────────────────────────── */}
          <motion.div
            className="liquid-glass glass-card w-full mt-16 p-5 rounded-2xl flex items-center gap-5"
            {...fadeUp(0.3)}
          >
            <div className="shrink-0 relative">
              <img
                src="/cv-qr-code.png"
                alt="QR CV"
                width={88}
                height={88}
                className="w-[88px] h-[88px] rounded-xl"
                style={{
                  border: "1px solid rgba(191,239,243,0.6)",
                  backgroundColor: "#F8F8F3",
                }}
              />
              <span
                className="absolute -inset-1 rounded-2xl opacity-60"
                style={{
                  border: "1px solid rgba(191,239,243,0.35)",
                  animation: "pulseRing 2.6s ease-in-out infinite",
                }}
                aria-hidden="true"
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-wide" style={{ color: "#1A1A2E" }}>
                Developer | Backend | Middleware | Frontend
              </p>
              <p
                className="text-xs mt-2 truncate"
                style={{ color: "rgba(26,26,46,0.5)" }}
              >
                ingenieroluisernestocantin@hotmail.com
              </p>
              <p className="text-xs" style={{ color: "rgba(26,26,46,0.5)" }}>
                +57 300 650 2320
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Columna derecha: presentación + redes ────────────────────── */}
        <div>
          <motion.h1
            className="text-3xl md:text-5xl font-bold tracking-tight"
            style={{ color: "rgba(51,65,85,0.9)" }}
            {...fadeUp(0.1)}
          >
            Luis Ernesto
            <br />
            <span className="gradient-text">Cantin Oviedo</span>
          </motion.h1>

          <motion.p
            className="mt-4 text-lg md:text-xl font-medium min-h-[1.5em]"
            style={{ color: "rgba(26,26,46,0.55)" }}
            {...fadeUp(0.2)}
          >
            {typed}
            <span
              className="ml-1 inline-block w-0.5 h-5 align-middle"
              style={{ backgroundColor: "#BFEFF3", animation: "blink 1s step-end infinite" }}
              aria-hidden="true"
            />
          </motion.p>

          <motion.p
            className="mt-6 text-base leading-relaxed font-light"
            style={{ color: "rgba(26,26,46,0.65)" }}
            {...fadeUp(0.28)}
          >
            Desarrollador full stack y middleware con enfoque en{" "}
            <strong style={{ color: "#1A1A2E" }}>.NET</strong>, creando
            experiencias digitales donde el diseño y la ingeniería se
            encuentran.
          </motion.p>

          {/* ── Redes sociales ─────────────────────────────────────────── */}
          <motion.div
            className="flex flex-wrap gap-3 mt-8"
            role="list"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07 } },
            }}
          >
            {SOCIAL_LINKS.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={link.label}
                className="relative flex items-center justify-center w-12 h-12 rounded-full glass-card transition-colors duration-300"
                style={{ color: link.color }}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                whileHover={{ y: -6, scale: 1.12 }}
                whileTap={{ scale: 0.92 }}
                role="listitem"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 28px ${link.color}40`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* ── Descarga de CV ─────────────────────────────────────────── */}
          <motion.div className="flex flex-wrap items-center gap-4 mt-10" {...fadeUp(0.35)}>
            <motion.a
              href="/CV_Luis_Ernesto_Cantin_EN.pdf"
              download
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-sm transition-all duration-300 aurora-glow group"
              style={{ backgroundColor: "#1A1A2E", color: "#F8F8F3" }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#2a2a3e";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#1A1A2E";
              }}
            >
              Descarga mi CV
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                <path
                  d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5"
                  stroke="#F8F8F3"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.a>

            <span className="text-xs font-light" style={{ color: "rgba(26,26,46,0.4)" }}>
              PDF — portafolio profesional actualizado
            </span>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spinSlow {
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        @keyframes pulseRing {
          0%,
          100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 0;
            transform: scale(1.08);
          }
        }
      `}</style>
    </section>
  );
}
