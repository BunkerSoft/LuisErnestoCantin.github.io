"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface EducationItem {
  id: string;
  type: string;
  institution: string;
  title: string;
  location: string;
  year: string;
  accentColor: string;
}

const EDUCATION: EducationItem[] = [
  {
    id: "edu-01",
    type: "Primaria",
    institution: "Liceo Nacional Max Seidel",
    title: "Básica Primaria",
    location: "Tumaco, Nariño",
    year: "1992",
    accentColor: "#BFEFF3",
  },
  {
    id: "edu-02",
    type: "Secundaria",
    institution: "Liceo Nacional Max Seidel",
    title: "Bachiller en Ciencias del Mar",
    location: "Tumaco, Nariño",
    year: "2001",
    accentColor: "#C9E4F5",
  },
  {
    id: "edu-03",
    type: "Universitaria",
    institution: "Universidad de Nariño",
    title: "Ingeniero de Sistemas",
    location: "Pasto, Nariño",
    year: "2011",
    accentColor: "#DDD8F5",
  },
  {
    id: "edu-04",
    type: "Especialización",
    institution: "Universidad Mariana",
    title: "Especialización en Contabilidad Internacional y Auditoría",
    location: "Pasto, Nariño",
    year: "2015",
    accentColor: "#DCEFAF",
  },
];

const COURSES = [
  {
    id: "course-01",
    institution: "Curso de tecnología .Net Microsoft",
    title: "Seminario Taller de Tecnología .Net",
    year: "2007",
  },
  {
    id: "course-02",
    institution: "Microsoft Virtual Academy",
    title: "Desarrollando en .Net con Visual Studio",
    year: "2014",
  },
  {
    id: "course-03",
    institution: "Microsoft Virtual Academy",
    title: "SQL Server 2008 R2",
    year: "2014",
  },
  {
    id: "course-04",
    institution: "Microsoft Virtual Academy",
    title: "Developing in HTML5 with JavaScript and CSS3 Jump Start",
    year: "2014",
  },
  {
    id: "course-05",
    institution: "Microsoft Virtual Academy",
    title: "Creando aplicaciones web con ASP.NET en Visual Studio",
    year: "2014",
  },
  {
    id: "course-06",
    institution: "Microsoft Virtual Academy",
    title: "Cloud Computing",
    year: "2014",
  },
  {
    id: "course-07",
    institution: "Microsoft Virtual Academy",
    title: "Windows Azure",
    year: "2014",
  },
  {
    id: "course-08",
    institution: "Microsoft Virtual Academy",
    title: "Introducción a Xamarin",
    year: "2014",
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-28 md:py-36 px-6 md:px-12 lg:px-20 liquid-glass"
      aria-labelledby="education-heading"
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
            Formación Académica
          </span>
          <h2
            id="education-heading"
            className="text-4xl md:text-6xl font-black tracking-tight"
            style={{ color: "#1A1A2E" }}
          >
            Estudios
            <br />
            <span className="gradient-text">académicos.</span>
          </h2>
          <p className="mt-5 text-base md:text-lg font-light max-w-xl" style={{ color: "rgba(26,26,46,0.5)" }}>
            Formación universitaria, especialización y cursos complementarios en tecnología.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20">
          {EDUCATION.map((item, i) => (
            <motion.div
              key={item.id}
              className="relative overflow-hidden rounded-xl p-6 md:p-8 glass-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div
                className="absolute top-0 left-0 w-1 h-full rounded-r"
                style={{ backgroundColor: item.accentColor }}
              />
              <span
                className="text-xs font-medium tracking-[0.2em] uppercase block mb-2"
                style={{ color: item.accentColor }}
              >
                {item.type}
              </span>
              <h3 className="text-xl font-bold" style={{ color: "#1A1A2E" }}>{item.institution}</h3>
              <p className="text-sm" style={{ color: "rgba(26,26,46,0.6)" }}>
                {item.title}
              </p>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-xs" style={{ color: "rgba(26,26,46,0.35)" }}>
                  {item.location}
                </span>
                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "rgba(26,26,46,0.2)" }} />
                <span className="text-xs font-medium" style={{ color: "rgba(26,26,46,0.5)" }}>
                  {item.year}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span
            className="text-xs font-medium tracking-[0.3em] uppercase block mb-6"
            style={{ color: "rgba(26,26,46,0.35)" }}
          >
            Cursos y Certificaciones
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {COURSES.map((course, i) => (
              <motion.div
                key={course.id}
                className="rounded-xl p-4 glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.05 }}
              >
                <span className="text-xs font-medium block mb-1" style={{ color: "rgba(26,26,46,0.45)" }}>
                  {course.year}
                </span>
                <p className="text-sm" style={{ color: "#1A1A2E" }}>{course.title}</p>
                <p className="text-xs mt-1" style={{ color: "rgba(26,26,46,0.35)" }}>
                  {course.institution}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
