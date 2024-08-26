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
        arrow:'#F4DA50',
        navColors: '#818181',
        buttonHover:'#A59D89',
        heroBackground: '#D9D9D9',
        cta: '#E9AE55',
        productBg: '#D9D9D9',

      },
      fontFamily: {
        NotoSansKR: ['Noto Sans KR', 'serif'],
      },
    },
  },
  plugins: [],
};
