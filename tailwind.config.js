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
      animation: {
        "snow-fall": "snowfall linear infinite",
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "bounce-gentle": "bounceGentle 2s ease-in-out infinite",
        "shake": "shake 0.5s ease-in-out",
        "pop-in": "popIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        snowfall: {
          "0%": { transform: "translateY(-10vh) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(110vh) rotate(360deg)", opacity: "0.3" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px #D4AF37, 0 0 10px #D4AF37" },
          "100%": { boxShadow: "0 0 20px #D4AF37, 0 0 30px #F0D060" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "75%": { transform: "translateX(5px)" },
        },
        popIn: {
          "0%": { transform: "scale(0.5)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
