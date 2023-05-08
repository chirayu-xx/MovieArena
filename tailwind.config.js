/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors:{
    'black': "#141A10",
    "black2": "#23351F",
    "black3": "#020c1b",
    "black-lighter": "#6A9563",
    "black-light": "#3A6130",
    "pink": "#96C008",
    "white": '#EBECF0',
    "gray": '#949494',
    },
    extend: {
      aspectRatio:{
        '1/1.5' : '1 / 1.5'
      }
      ,
      keyframes:{
        roll:{
          '0%': {top:'0'},
          '100%': {top : '-15px'},
        }
      },
      animation:{
        'loading' : 'roll 150ms infinite'
      }
    },

  },
  plugins: [],
}