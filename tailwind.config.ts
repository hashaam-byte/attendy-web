import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // attendy-web brand — Blue → Purple
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        purple: {
          50: "#faf5ff",
          100: "#f3e8ff",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
        },
        // vertical accents
        edu: { DEFAULT: "#22c55e", dark: "#16a34a" },
        bank: { DEFAULT: "#3b82f6", dark: "#1d4ed8" },
        office: { DEFAULT: "#8b5cf6", dark: "#6d28d9" },
        biz: { DEFAULT: "#f59e0b", dark: "#b45309" },
        events: { DEFAULT: "#f43f5e", dark: "#be185d" },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)",
        "hero-gradient-dark":
          "linear-gradient(135deg, #1e3a8a 0%, #312e81 50%, #4c1d95 100%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.1) 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "slide-in-left": "slideInLeft 0.6s ease-out forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "counter-up": "counterUp 0.3s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        "glow-blue":
          "0 0 20px rgba(99,102,241,0.35), 0 0 40px rgba(99,102,241,0.15)",
        "glow-purple":
          "0 0 20px rgba(139,92,246,0.35), 0 0 40px rgba(139,92,246,0.15)",
        card: "0 1px 3px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.04)",
        "card-dark":
          "0 1px 3px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.2)",
      },
    },
  },
  plugins: [],
};
