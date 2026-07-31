'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Easing } from 'framer-motion';

const TOOLS = [
  { src: '/tools/vscode.svg', label: 'VS Code' },
  { src: '/tools/git.svg', label: 'Git' },
  { src: '/tools/github.svg', label: 'GitHub' },
  { src: '/tools/azure.svg', label: 'Azure' },
  { src: '/tools/dotnetcore.svg', label: '.NET' },
  { src: '/tools/sqlserver.svg', label: 'SQL' },
  { src: '/tools/postgresql.svg', label: 'PostgreSQL' },
  { src: '/tools/mysql.svg', label: 'MySQL' },
  { src: '/tools/javascript.svg', label: 'JS' },
  { src: '/tools/angularjs.svg', label: 'Angular' },
  { src: '/tools/nodejs.svg', label: 'Node' },
  { src: '/tools/tailwindcss.svg', label: 'Tailwind' },
];

export default function Tools() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-15%' });

  const ease: Easing = [0.16, 1, 0.3, 1];

  return (
    <section
      id="tools"
      ref={sectionRef}
      className="relative py-28 md:py-40 px-6 overflow-hidden"
      style={{ backgroundColor: '#F8F8F3' }}
      aria-labelledby="tools-heading"
    >
      <motion.div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full opacity-40"
        style={{
          background: 'radial-gradient(circle, #C9E4F5 0%, transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        <motion.header
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <span
            className="text-xs font-medium tracking-[0.3em] uppercase block mb-4"
            style={{ color: 'rgba(26,26,46,0.35)' }}
          >
            Stack de trabajo
          </span>
          <h2
            id="tools-heading"
            className="text-4xl md:text-6xl font-black tracking-tight"
            style={{ color: '#1A1A2E' }}
          >
            Mis <span className="gradient-text">herramientas.</span>
          </h2>
        </motion.header>
        <hr></hr>
        <br></br>
        {/* ── Anillo 3D giratorio ─────────────────────────────────────── */}
        <motion.div
          className="tool-ring"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease, delay: 0.15 }}
        >
          <div className="tool-ring-track" aria-label="Herramientas de desarrollo">
            {TOOLS.map((tool, i) => {
              const angle = (i / TOOLS.length) * 360;
              return (
                <div
                  key={tool.label}
                  className="tool-item"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(130px)`,
                  }}
                  title={tool.label}
                >
                  <img src={tool.src} alt={tool.label} width={24} height={24} />
                  <span>{tool.label}</span>
                </div>
              );
            })}
          </div>

          {/* Centro del anillo */}
          <div className="tool-ring-center" aria-hidden="true">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#BFEFF3' }} />
            <span
              className="text-[10px] font-semibold tracking-[0.2em] uppercase"
              style={{ color: '#1A1A2E' }}
            >
              Stack
            </span>
          </div>
        </motion.div>

        {/* ── Leyenda: categorías del stack ───────────────────────────── */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mt-16"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {[
            { label: 'Backend · .NET / C#', color: '#C9E4F5' },
            { label: 'Frontend · Angular / JS / Tailwind', color: '#BFEFF3' },
            { label: 'Bases de datos · SQL / MySQL / PostgreSQL', color: '#DDD8F5' },
            { label: 'Cloud & CI/CD · Azure / Git / GitHub', color: '#FFF1A8' },
          ].map(cat => (
            <motion.span
              key={cat.label}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium glass-card whitespace-nowrap"
              style={{ color: '#1A1A2E' }}
              variants={{
                hidden: { opacity: 0, y: 16, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.5, ease },
                },
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: cat.color }}
                aria-hidden="true"
              />
              {cat.label}
            </motion.span>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .tool-ring {
          position: relative;
          width: 260px;
          height: 260px;
          margin: 0 auto;
          perspective: 1200px;
        }
        .tool-ring-track {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          animation: toolSpin 24s linear infinite;
        }
        .tool-ring:hover .tool-ring-track {
          animation-play-state: paused;
        }
        @keyframes toolSpin {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(360deg);
          }
        }
        .tool-item {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 56px;
          height: 56px;
          margin: -28px 0 0 -28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.55);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.75);
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(26, 26, 46, 0.1);
          transition: all 0.4s ease;
          cursor: default;
        }
        .tool-item img {
          width: 26px;
          height: 26px;
          transition: transform 0.3s ease;
        }
        .tool-item span {
          font-size: 8px;
          font-weight: 600;
          margin-top: 4px;
          color: rgba(26, 26, 46, 0.65);
          letter-spacing: 0.04em;
          white-space: nowrap;
        }
        .tool-item:hover {
          transform: scale(1.25) !important;
          background: rgba(255, 255, 255, 0.85);
          border-color: rgba(191, 239, 243, 0.9);
          box-shadow: 0 12px 32px rgba(191, 239, 243, 0.5);
          z-index: 20;
        }
        .tool-item:hover img {
          transform: scale(1.15);
        }
        .tool-ring-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          width: 84px;
          height: 84px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow:
            0 8px 32px rgba(26, 26, 46, 0.1),
            0 0 40px rgba(191, 239, 243, 0.35);
          justify-content: center;
          pointer-events: none;
        }
      `}</style>
    </section>
  );
}
