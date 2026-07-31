"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ReferenceItem {
  id: string;
  name: string;
  phone: string;
  role: string;
  entity: string;
  city: string;
  type: "profesional" | "familiar";
}

const REFERENCES: ReferenceItem[] = [
  {
    id: "ref-01",
    name: "Edvard Fray Rodriguez Sanchez",
    phone: "318 876 2322",
    role: "Arquitecto de Software",
    entity: "Digital Bank",
    city: "Bogotá",
    type: "profesional",
  },
  {
    id: "ref-02",
    name: "Diego Fernando Gómez Salazar",
    phone: "312 305 0660",
    role: "Arquitecto de Software | Solutions Architect",
    entity: "HITSS COLOMBIA S.A.S.",
    city: "Medellín, Antioquia",
    type: "profesional",
  },
  {
    id: "ref-03",
    name: "Jhon Andres Gallego Garcia",
    phone: "315 851 8277",
    role: "Analista de Facturación",
    entity: "Opain",
    city: "Bogotá",
    type: "profesional",
  },
  {
    id: "ref-04",
    name: "Walter Guillermo Cantin Oviedo",
    phone: "320 730 6000",
    role: "Abogado",
    entity: "",
    city: "Pasto",
    type: "familiar",
  },
  {
    id: "ref-05",
    name: "Katherine Johanna Diaz",
    phone: "314 449 1444",
    role: "Abogada — Esp. Derecho Penal",
    entity: "",
    city: "La Unión, Nariño",
    type: "familiar",
  },
];

export default function References() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  const profesionales = REFERENCES.filter((r) => r.type === "profesional");
  const familiares = REFERENCES.filter((r) => r.type === "familiar");

  return (
    <section
      id="references"
      ref={sectionRef}
      className="relative py-28 md:py-36 px-6 md:px-12 lg:px-20"
      style={{ backgroundColor: "#F8F8F3" }}
      aria-labelledby="references-heading"
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
            Referencias
          </span>
          <h2
            id="references-heading"
            className="text-4xl md:text-6xl font-black tracking-tight"
            style={{ color: "#1A1A2E" }}
          >
            Referencias
            <br />
            <span className="gradient-text">personales.</span>
          </h2>
        </motion.header>

        <div className="mb-16">
          <span
            className="text-sm font-medium tracking-[0.2em] uppercase block mb-6"
            style={{ color: "rgba(26,26,46,0.3)" }}
          >
            Profesionales
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {profesionales.map((ref, i) => (
              <motion.div
                key={ref.id}
                className="rounded-xl p-6 glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <h3 className="text-lg font-bold" style={{ color: "#1A1A2E" }}>
                  {ref.name}
                </h3>
                <p className="text-sm mt-1 font-medium" style={{ color: "rgba(26,26,46,0.6)" }}>
                  {ref.role}
                </p>
                {ref.entity && (
                  <p className="text-sm" style={{ color: "rgba(26,26,46,0.45)" }}>
                    {ref.entity}
                  </p>
                )}
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-xs font-medium" style={{ color: "rgba(26,26,46,0.5)" }}>
                    {ref.phone}
                  </span>
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "rgba(26,26,46,0.2)" }} />
                  <span className="text-xs" style={{ color: "rgba(26,26,46,0.35)" }}>
                    {ref.city}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <span
            className="text-sm font-medium tracking-[0.2em] uppercase block mb-6"
            style={{ color: "rgba(26,26,46,0.3)" }}
          >
            Familiares
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {familiares.map((ref, i) => (
              <motion.div
                key={ref.id}
                className="rounded-xl p-6 glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <h3 className="text-lg font-bold" style={{ color: "#1A1A2E" }}>
                  {ref.name}
                </h3>
                <p className="text-sm mt-1" style={{ color: "rgba(26,26,46,0.55)" }}>
                  {ref.role}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-xs font-medium" style={{ color: "rgba(26,26,46,0.5)" }}>
                    {ref.phone}
                  </span>
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "rgba(26,26,46,0.2)" }} />
                  <span className="text-xs" style={{ color: "rgba(26,26,46,0.35)" }}>
                    {ref.city}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          className="mt-16 text-xs text-center max-w-2xl mx-auto leading-relaxed"
          style={{ color: "rgba(26,26,46,0.3)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Para efectos legales hago constar que la información suministrada en la presente hoja de vida es totalmente cierta (C.S.T. ART. 62 NÚM. 1º) y puede ser verificada en su totalidad.
        </motion.p>
      </div>
    </section>
  );
}
