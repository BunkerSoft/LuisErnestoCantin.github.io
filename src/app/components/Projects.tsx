"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Experience {
  id: string;
  number: string;
  company: string;
  role: string;
  tags: string[];
  description: string;
  accentColor: string;
  glowColor: string;
  period: string;
  colSpan?: "normal" | "wide";
}

const EXPERIENCES: Experience[] = [
  {
    id: "exp-10",
    number: "10",
    company: "PERSONAL SOFT S.A.S.",
    role: "Intermediate Software Developer",
    tags: [".NET 6", "Angular 18", "Azure DevOps", "SQL Server"],
    description:
      "Desarrollo full stack para proyectos WTW (ABC Multi), CPM (Control de Procesos de Manufactura) e IVC. Implementé módulos de monitoreo de temperatura, APIs con .NET 6, Angular 18, y flujos CI/CD en Azure DevOps. Migración de aplicación PHP a .NET 5.",
    accentColor: "#BFEFF3",
    glowColor: "rgba(191,239,243,0.25)",
    period: "2025 — 2026",
    colSpan: "wide",
  },
  {
    id: "exp-09",
    number: "09",
    company: "HITSS COLOMBIA S.A.S.",
    role: "Desarrollador .Net Estándar",
    tags: [".NET 5", "Azure", "CI/CD", "C#"],
    description:
      "Desarrollo en portal de facturación web con .NET Core 5 y C#. Implementé notificaciones automáticas, consultas de históricos, generación de PDF, integración de pagos PSE y monitoreo con Application Insights. Refactorización de código legacy y optimización de rendimiento.",
    accentColor: "#DDD8F5",
    glowColor: "rgba(221,216,245,0.25)",
    period: "2024 — 2025",
    colSpan: "normal",
  },
  {
    id: "exp-08",
    number: "08",
    company: "Digital Bank",
    role: "Desarrollador T3",
    tags: [".NET", "Razor Pages", "SQL Server", "SendGrid"],
    description:
      "Soporte a plataformas Opain y Smart Cash. Desarrollé interfaces para gestión de tráfico aéreo (67 causales de facturación), módulo de notificaciones con SendGrid y estructura jerárquica tipo explorador de Windows. Coordinación de despliegues CI/CD en Azure DevOps.",
    accentColor: "#DCEFAF",
    glowColor: "rgba(220,239,175,0.25)",
    period: "2021 — 2023",
    colSpan: "normal",
  },
  {
    id: "exp-07",
    number: "07",
    company: "Metronics",
    role: "Ingeniero de Desarrollo Senior",
    tags: ["SSRS", ".NET Core", "SQL Server", "Reporting"],
    description:
      "Diseño e implementación de informes dinámicos con SQL Server Reporting Services. Creación de reportes parametrizados, integración con aplicaciones .NET Core, optimización de consultas SQL para mejora de tiempos de respuesta en los proyectos SIE7E, SIEF y Operaciones 360.",
    accentColor: "#FFF1A8",
    glowColor: "rgba(255,241,168,0.25)",
    period: "2021",
    colSpan: "normal",
  },
  {
    id: "exp-06",
    number: "06",
    company: "E.S.E Hospital Eduardo Santos",
    role: "Ingeniero de Sistemas",
    tags: ["PostgreSQL", "RIPS", "Soporte", "Salud"],
    description:
      "Soporte a facturación de servicios de salud, administración de bases de datos PostgreSQL, gestión de RIPS, depuración y carga de datos. Configuración de Microtik y cámaras de seguridad. Aseguramiento del cumplimiento normativo en reportes de prestación de servicios.",
    accentColor: "#C9E4F5",
    glowColor: "rgba(201,228,245,0.25)",
    period: "2017 — 2020",
    colSpan: "wide",
  },
  {
    id: "exp-05",
    number: "05",
    company: "GALERAS STUDIOS",
    role: "Desarrollador de Software Full Stack .NET",
    tags: [".NET", "C#", "SQL Server", "Full Stack"],
    description:
      "Desarrollo de software en lenguaje .NET con C# y SQL Server. Implementación de soluciones full stack para aplicaciones empresariales.",
    accentColor: "#BFEFF3",
    glowColor: "rgba(191,239,243,0.25)",
    period: "2016 — 2017",
    colSpan: "normal",
  },
  {
    id: "exp-04",
    number: "04",
    company: "INDRA COMPANY",
    role: "Desarrollador de Software Lab II",
    tags: [".NET", "C#", "SQL Server", "Full Stack"],
    description:
      "Desarrollador .NET con C# y SQL Server para soluciones empresariales en una de las consultoras tecnológicas más grandes del mundo.",
    accentColor: "#DDD8F5",
    glowColor: "rgba(221,216,245,0.25)",
    period: "2013 — 2014",
    colSpan: "normal",
  },
  {
    id: "exp-03",
    number: "03",
    company: "CONTACTAR",
    role: "Programador de Sistemas",
    tags: [".NET", "SQL Server", "Full Stack"],
    description:
      "Desarrollo del aplicativo FINANCIAL en lenguaje .NET con SQL Server. Implementación full stack para solución financiera empresarial.",
    accentColor: "#DCEFAF",
    glowColor: "rgba(220,239,175,0.25)",
    period: "2012",
    colSpan: "normal",
  },
  {
    id: "exp-02",
    number: "02",
    company: "SIFIZSOFT",
    role: "Analista de Sistemas",
    tags: ["C#", "SQL Server", "Full Stack"],
    description:
      "Desarrollo de software financiero (Financial Business Systems) con C# y SQL Server. Análisis y desarrollo full stack para soluciones empresariales.",
    accentColor: "#FFF1A8",
    glowColor: "rgba(255,241,168,0.25)",
    period: "2011",
    colSpan: "normal",
  },
  {
    id: "exp-01",
    number: "01",
    company: "COMERCIACAFE",
    role: "Ingeniero de Sistemas",
    tags: ["Redes", "Soporte", "Mantenimiento"],
    description:
      "Asociación de cafeteros de La Unión Nariño. Manejo de redes, soporte y mantenimiento de equipos de cómputo.",
    accentColor: "#C9E4F5",
    glowColor: "rgba(201,228,245,0.25)",
    period: "2009 — 2010",
    colSpan: "normal",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <motion.article
      id={`exp-card-${experience.id}`}
      variants={cardVariants}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
      className={`aurora-glow glass-card relative overflow-hidden flex flex-col justify-between p-7 md:p-9 min-h-[280px] cursor-pointer group ${
        experience.colSpan === "wide" ? "md:col-span-2" : "md:col-span-1"
      }`}
      style={
        {
          "--glow-color": experience.glowColor,
        } as React.CSSProperties
      }
    >
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-60"
        style={{
          background: `linear-gradient(90deg, transparent, ${experience.accentColor}, transparent)`,
        }}
      />

      <div
        className="absolute -top-20 -right-20 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none"
        style={{ backgroundColor: experience.accentColor }}
        aria-hidden="true"
      />

      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-xs font-medium tracking-[0.2em] uppercase mb-1 block"
            style={{ color: experience.accentColor }}>
            {experience.number}
          </span>
          <h3 className="text-xl md:text-2xl font-bold tracking-tight leading-snug"
            style={{ color: "#1A1A2E" }}>
            {experience.company}
          </h3>
          <p className="text-sm mt-1" style={{ color: "rgba(26,26,46,0.5)" }}>
            {experience.role}
          </p>
        </div>

        <motion.div
          className="flex-shrink-0 w-9 h-9 rounded-full border flex items-center justify-center mt-1"
          style={{ borderColor: "rgba(26,26,46,0.15)" }}
          whileHover={{ scale: 1.1, borderColor: experience.accentColor }}
          transition={{ duration: 0.2 }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5"
              stroke="#1A1A2E"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>

      <p className="text-sm md:text-base leading-relaxed mt-4 flex-1"
        style={{ color: "rgba(26,26,46,0.55)" }}>
        {experience.description}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-3 mt-6">
        <div className="flex flex-wrap gap-2">
          {experience.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: "rgba(26,26,46,0.04)",
                border: "1px solid rgba(26,26,46,0.08)",
                color: "rgba(26,26,46,0.65)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <span
          className="text-xs font-medium tracking-widest"
          style={{ color: "rgba(26,26,46,0.3)" }}
        >
          {experience.period}
        </span>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-28 md:py-36 px-6 md:px-12 lg:px-20 liquid-glass"
      aria-labelledby="projects-heading"
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #BFEFF3 25%, #DDD8F5 50%, #DCEFAF 75%, transparent 100%)",
          opacity: 0.4,
        }}
        aria-hidden="true"
      />

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-[120px] opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, #DDD8F5 0%, #BFEFF3 50%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        <motion.header
          className="mb-16 md:mb-20 max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className="text-xs font-medium tracking-[0.3em] uppercase block mb-4"
            style={{ color: "rgba(26,26,46,0.35)" }}
          >
            Trayectoria
          </span>
          <h2
            id="projects-heading"
            className="text-4xl md:text-6xl font-black tracking-tight"
            style={{ color: "#1A1A2E" }}
          >
            Experiencia
            <br />
            <span className="gradient-text">profesional.</span>
          </h2>
          <p
            className="mt-5 text-base md:text-lg font-light max-w-xl"
            style={{ color: "rgba(26,26,46,0.5)" }}
          >
            Más de 6 años desarrollando soluciones empresariales en .NET, Angular y Azure. Desde 2009 construyendo tecnología para diversos sectores.
          </p>
        </motion.header>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {EXPERIENCES.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </motion.div>

        <motion.div
          className="mt-16 flex items-center gap-6"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <a
            id="cta-contact"
            href="mailto:ingenieroluisernestocantin@hotmail.com"
            className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-medium text-sm transition-all duration-300"
            style={{
              backgroundColor: "#1A1A2E",
              border: "1px solid rgba(26,26,46,0.15)",
              color: "#F8F8F3",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "#2a2a3e";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "#1A1A2E";
            }}
          >
            Contáctame
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M2.5 11.5L11.5 2.5M11.5 2.5H5.5M11.5 2.5V8.5"
                stroke="#F8F8F3"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>

          <a
            id="cta-cv"
            href="#"
            className="text-sm font-medium transition-colors duration-200"
            style={{ color: "rgba(26,26,46,0.4)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "rgba(26,26,46,0.8)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "rgba(26,26,46,0.4)")
            }
          >
            Descargar CV →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
