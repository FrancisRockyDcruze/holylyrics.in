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
        // accent: "#10b981",    // green
      }
    },
  },
  plugins: [],
}

