/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-page': "url('/wendor.jpg')",
      },
      colors: {
        mainYellow: "#FFAA3B",
        pink: "#D2416E",
        teal: "#0DB1AD",
        grey: "#D0D0D0",
        purple: "#7042C9",
        blue: "#197BD2",
        lightGrey: "#D9D9D9",
        lightBlack: "#1E1E1E",
        secondaryBlack: "#3A3A3A"
      }
    },
  },
  plugins: [],
}