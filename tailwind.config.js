/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'max-sm': '376px',
      // => @media (min-width: 576px) { ... }

      'md': '736px',
      // => @media (min-width: 960px) { ... }

      'lg': '928px',
      // => @media (min-width: 1440px) { ... }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

