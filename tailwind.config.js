/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFD700',
          dark: '#B8860B',
        },
        dark: {
          DEFAULT: '#121212',
          light: '#1E1E1E',
        }
      }
    },
  },
  plugins: [],
}
