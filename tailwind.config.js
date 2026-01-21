/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        "neutral-900": "var(--color-neutral-900)",
        "neutral-800": "var(--color-neutral-800)",
        "neutral-700": "var(--color-neutral-700)",
        "neutral-600": "var(--color-neutral-600)",
        "neutral-500": "var(--color-neutral-500)",
        "neutral-300": "var(--color-neutral-300)",
        "neutral-100": "var(--color-neutral-100)",
        "soft-white": "var(--color-soft-white)",
        success: "var(--color-success)",
        info: "var(--color-info)",
        warn: "var(--color-warn)",
        danger: "var(--color-danger)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        glass: "0 20px 60px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
}

