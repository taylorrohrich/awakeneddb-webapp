/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/helpers/cva.ts",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/types/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        grow: "grow 1s ease-in-out infinite",
      },
      keyframes: {
        grow: {
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
      },
      spacing: {
        screenBody: "calc(100vh - 4rem)",
        contentBody: "calc(100vh - 8rem)",
      },
      colors: {
        duel: "#a88143",
        soloExploration: "#119bc0",
        hauntedHollow: "#8366a0",
        deathlyDell: "#c94544",
        quill: "#5c4739",
        parchment: "#e0d4bc",
        mythic: "#373e56",
        dark: "#d4e7c1",
        legendary: "#f6de69",
        epic: "#6e2c7f",
        rare: "#5f7f7d",
        common: "#635d4b",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
