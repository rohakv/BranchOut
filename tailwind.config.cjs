/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero": "url('/public/background.png')",
      }
    },
  },
  plugins: [],
};

module.exports = config;
