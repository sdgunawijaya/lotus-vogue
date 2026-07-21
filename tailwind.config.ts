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
          pink: "#E8A0BF",
          "pink-light": "#F5D6E0",
          "pink-dark": "#D4729A",
          gold: "#C9A84C",
          "gold-light": "#E8D48B",
          "gold-dark": "#A68A30",
          "warm-white": "#FAF7F2",
          charcoal: "#2D2D2D",
          "soft-rose": "#FDF0F5",
          cream: "#F5F0E8",
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
