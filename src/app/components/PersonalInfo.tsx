"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PERSONAL_DATA = [
  { label: "Nombre Completo", value: "Luis Ernesto Cantin Oviedo" },
  { label: "Cédula de Ciudadanía", value: "87.944.197 de Tumaco" },
  { label: "Fecha de Nacimiento", value: "19 de octubre de 1980" },
  { label: "Lugar de Nacimiento", value: "Tumaco, Nariño" },
  { label: "Libreta Militar", value: "Tarjeta reservista segunda clase" },
  { label: "Dirección", value: "Calle 18 Mz 2 Casa 12, Barrio El Refugio" },
  { label: "Ciudad", value: "La Unión, Nariño" },
  { label: "Celular", value: "300 650 2320 — 314 449 1444" },
  { label: "Email", value: "ingenieroluisernestocantin@hotmail.com" },
];

export default function PersonalInfo() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section
      id="personal"
      ref={sectionRef}
      className="relative py-28 md:py-36 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: "#F8F8F3" }}
      aria-labelledby="personal-heading"
    >
      <div className="max-w-6xl mx-auto">
        <motion.header
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="text-xs font-medium tracking-[0.3em] uppercase block mb-4"
            style={{ color: "rgba(26,26,46,0.35)" }}
          >
            Información Personal
          </span>
          <h2
            id="personal-heading"
            className="text-4xl md:text-6xl font-black tracking-tight"
            style={{ color: "#1A1A2E" }}
          >
            Datos
            <br />
            <span className="gradient-text">personales.</span>
          </h2>
        </motion.header>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {PERSONAL_DATA.map((item, i) => (
            <motion.div
              key={item.label}
              className="rounded-xl p-5 glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
            >
              <span
                className="text-xs font-medium tracking-[0.15em] uppercase block mb-1"
                style={{ color: "rgba(26,26,46,0.35)" }}
              >
                {item.label}
              </span>
              <span className="text-base font-medium" style={{ color: "#1A1A2E" }}>
                {item.value}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
