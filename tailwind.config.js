/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        txtColor: "#ffffff",   // default blue
        bgColor: "#f59e0b", // orange
        bglightColor:"#ffedd5"   //light color
      }
    },
  },
  plugins: [],
}

