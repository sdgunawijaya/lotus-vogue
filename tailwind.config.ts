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
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          accent: "#C4A35A",
          "accent-light": "#ECD9A0",
          "accent-dark": "#9B7B3C",
          gold: "#D4AF37",
          "gold-light": "#F0E08C",
          "gold-dark": "#996515",
          "warm-white": "#FAF7F2",
          charcoal: "#2D2D2D",
          "soft-rose": "#F5EDE0",
          cream: "#F0E8D8",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
