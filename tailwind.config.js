/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        txtColor: "rgb(var(--txtColor) / <alpha-value>)",
        bgColor: "rgb(var(--bgColor) / <alpha-value>)",
        bglightColor: "rgb(var(--bglightColor) / <alpha-value>)",
      }
    },
  },
  plugins: [],
}

