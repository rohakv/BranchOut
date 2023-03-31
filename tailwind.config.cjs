/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'bgimage': "url('../public/assets/images/hero.png')"
      }
    },
    
  },
  plugins: [],
};

module.exports = config;
