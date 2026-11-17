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
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "Segoe UI",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "SF Mono",
          "ui-monospace",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      colors: {
        canvas: "rgb(var(--color-canvas) / <alpha-value>)",
        ink: {
          DEFAULT: "rgb(var(--color-ink) / <alpha-value>)",
          secondary: "rgb(var(--color-ink-secondary) / <alpha-value>)",
          muted: "rgb(var(--color-ink-muted) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
          hover: "rgb(var(--color-accent-hover) / <alpha-value>)",
          soft: "rgb(var(--color-accent-soft) / <alpha-value>)",
          ink: "rgb(var(--color-accent-ink) / <alpha-value>)",
        },
        line: {
          DEFAULT: "rgb(var(--color-line) / <alpha-value>)",
          strong: "rgb(var(--color-line-strong) / <alpha-value>)",
        },
      },
      boxShadow: {
        glass:
          "0 1px 2px rgba(15, 23, 32, 0.04), 0 12px 32px -12px rgba(15, 23, 32, 0.07), inset 0 1px 0 rgba(255, 255, 255, 0.72)",
        "glass-hover":
          "0 2px 6px rgba(15, 23, 32, 0.06), 0 18px 40px -14px rgba(15, 23, 32, 0.11), inset 0 1px 0 rgba(255, 255, 255, 0.85)",
        "glass-dark":
          "0 1px 2px rgba(0, 0, 0, 0.35), 0 14px 36px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.07)",
        dock: "0 8px 30px -6px rgba(15, 23, 32, 0.14), 0 1px 3px rgba(15, 23, 32, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.82)",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.125rem",
        "3xl": "1.375rem",
      },
      screens: {
        xs: "390px",
      },
    },
  },
  plugins: [],
};

export default config;
