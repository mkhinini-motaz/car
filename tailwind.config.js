/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/App.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/i18n/index.ts",
    "./src/screens/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      primary: '#88D66C',
      secondary: '#EF5A6F',
    },
  },
  plugins: [],
}

