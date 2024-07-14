/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
          "gray-light": colors.gray[200],
          gray: colors.gray[300],
          "gray-dark": colors.gray[400],
          "slate-light": colors.slate[100],
          slate: colors.slate[200],
          indigo: colors.indigo[200],
          "blue-light": colors.blue[200],
          blue: colors.blue[500],
          "blue-dark": colors.blue[600],
          "green-light": colors.green[200],
          "green-dark": colors.green[600],
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-in forwards",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
  },

  plugins: [],
};
