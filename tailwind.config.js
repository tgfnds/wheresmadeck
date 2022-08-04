/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "green-dark": "#2C3639",
        "green-light": "#3F4E4F",
        "beige-light": "#DCD7C9",
        "brown": "#A27B5C"
      }
    },
  },
  plugins: [],
}