// tailwind.config.js
const {heroui} = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'hover:translate-y-2.5',
    ...Array.from(
      { length: 12 },
      (_, i) => `grid-rows-${i + 1}`),
    ...Array.from(
        { length: 12 },
        (_, i) => `grid-cols-${i + 1}`)
  ],
  darkMode: "class",
  plugins: [heroui()],
};