"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setIsScrolled(v > 0.01);
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <header
      id="navbar"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
        backgroundColor: isScrolled ? "rgba(248,248,243,0.75)" : "transparent",
        borderBottom: isScrolled
          ? "1px solid rgba(26,26,46,0.06)"
          : "1px solid transparent",
      }}
    >
      <motion.div
        className="absolute bottom-0 left-0 h-px"
        style={{
          width: progressWidth,
          background:
            "linear-gradient(90deg, #BFEFF3, #DDD8F5, #FFF1A8)",
          opacity: isScrolled ? 1 : 0,
        }}
        aria-hidden="true"
      />

      <nav
        className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between"
        aria-label="Navegación principal"
      >
        <a
          id="nav-logo"
          href="/"
          className="font-bold text-base tracking-tight"
          style={{ color: "#1A1A2E" }}
        >
          LC
          <span
            className="ml-0.5 inline-block w-1.5 h-1.5 rounded-full align-middle mb-0.5"
            style={{ backgroundColor: "#BFEFF3" }}
            aria-hidden="true"
          />
        </a>

        <ul className="hidden md:flex items-center gap-8 text-sm font-medium" role="list">
          {[
            { href: "#personal", label: "Datos" },
            { href: "#tools", label: "Herramientas" },
            { href: "#education", label: "Estudios" },
            { href: "#projects", label: "Experiencia" },
            { href: "#references", label: "Referencias" },
            { href: "mailto:ingenieroluisernestocantin@hotmail.com", label: "Contacto" },
          ].map((link) => (
            <li key={link.href}>
              <a
                id={`nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}
                href={link.href}
                className="transition-colors duration-200 hover:opacity-60"
                style={{ color: "#1A1A2E" }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          id="nav-cta"
          href="mailto:ingenieroluisernestocantin@hotmail.com"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
          style={{
            backgroundColor: "#1A1A2E",
            color: "#F8F8F3",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "#2a2a3e";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "#1A1A2E";
          }}
        >
          Disponible para proyectos
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
        </a>

        <button
          id="nav-mobile-menu"
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          <span
            className="block w-5 h-px transition-all duration-300"
            style={{
              backgroundColor: "#1A1A2E",
              transform: menuOpen ? "rotate(45deg) translate(1.5px, 1.5px)" : "none",
            }}
          />
          <span
            className="block w-5 h-px transition-all duration-300"
            style={{
              backgroundColor: "#1A1A2E",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-5 h-px transition-all duration-300"
            style={{
              backgroundColor: "#1A1A2E",
              transform: menuOpen ? "rotate(-45deg) translate(1.5px, -1.5px)" : "none",
            }}
          />
        </button>
      </nav>

      <motion.div
        id="nav-mobile-panel"
        initial={false}
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="md:hidden overflow-hidden"
        style={{
          backgroundColor: "rgba(248,248,243,0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <ul className="px-6 pb-6 pt-2 flex flex-col gap-4 text-sm font-medium" role="list">
          {[
            { href: "#personal", label: "Datos" },
            { href: "#tools", label: "Herramientas" },
            { href: "#education", label: "Estudios" },
            { href: "#projects", label: "Experiencia" },
            { href: "#references", label: "Referencias" },
            { href: "mailto:ingenieroluisernestocantin@hotmail.com", label: "Contacto" },
          ].map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{ color: "#1A1A2E" }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
    </header>
  );
}
