/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  // bgColor: "#f59e0b", // orange
  // bglightColor:"#ffedd5"   //light color  
  // bgColor: "#2c7ae7", // orange
  // bglightColor:"#93d9f1"   //light color
  // txtColor: "#ffffff",   // default blue
  // bgColor: "#037a18", // green
  // bglightColor:"#c1fab6"   //light color

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

