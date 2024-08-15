import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-page': "url('/wendor.jpg')",
      },
      colors: {
        blue: "#1A55E3",
        pink: "#FE9496",
        teal: "#0DB1AD",
        lightBlue: "#4BCBEB",
        purple: "#9E58FF"
      }
    },
  },
  darkMode: "class",
  plugins: [
    nextui()
  ],
}