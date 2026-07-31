import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8F8F3",
        "aurora-cyan": "#BFEFF3",
        "aurora-yellow": "#FFF1A8",
        "aurora-green": "#DCEFAF",
        "aurora-blue": "#C9E4F5",
        "aurora-violet": "#DDD8F5",
        text: "#1A1A2E",
        "text-muted": "rgba(26,26,46,0.5)",
        glass: "rgba(255,255,255,0.38)",
        "glass-card": "rgba(255,255,255,0.4)",
        "glass-border": "rgba(255,255,255,0.3)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["var(--font-display)", "Space Grotesk", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease forwards",
        "shimmer": "shimmer 2.5s infinite",
        "liquid": "liquidFlow 20s ease infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        liquidFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
