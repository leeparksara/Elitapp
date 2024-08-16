/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBackground: '#EDEDE9',
        customButton1: '#CBC6B8',
        customButton2: '#898787',
        navColors: '#818181',
        buttonHover:'#A59D89',

      },
    },
  },
  plugins: [],
};
