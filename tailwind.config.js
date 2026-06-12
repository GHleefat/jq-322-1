/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        christmas: {
          red: "#C41E3A",
          "red-dark": "#8B0000",
          green: "#0B6623",
          "green-dark": "#064E17",
          gold: "#D4AF37",
          "gold-light": "#F0D060",
          snow: "#FFFAF0",
          silver: "#C0C0C0",
        },
      },
      fontFamily: {
        display: ['"Ma Shan Zheng"', "cursive"],
        body: ['"Noto Serif SC"', "serif"],
      },
    },
  },
  plugins: [],
};
