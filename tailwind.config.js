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
    'black': "#04152d",
    "black2": "#041226",
    "black3": "#020c1b",
    "black-lighter": "#1c4b91",
    "black-light": "#173d77",
    "pink": "#da2f68",
    "orange": "#f89e00",
    "gradient": "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
    "white": '#EBECF0',
    "gray": '#949494'
    },
    extend: {

    },
  },
  plugins: [],
}