/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Activer le mode sombre basé sur une classe
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 