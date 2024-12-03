const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content()
  ],
  theme: {
    extend: {
      colors: {
        'malachite': {
          '50': '#f2fcf1',
          '100': '#defade',
          '200': '#c0f3bf',
          '300': '#8de88d',
          '400': '#54d454',
          '500': '#32cd32',
          '600': '#209920',
          '700': '#1c791d',
          '800': '#1b601c',
          '900': '#184f1a',
          '950': '#082b09',
        },
        'silver-chalice': {
        '50': '#f7f7f7',
        '100': '#ededed',
        '200': '#dfdfdf',
        '300': '#c8c8c8',
        '400': '#a9a9a9',
        '500': '#999999',
        '600': '#888888',
        '700': '#7b7b7b',
        '800': '#676767',
        '900': '#545454',
        '950': '#363636',
    },
    

      }
    },
  },
  plugins: [ flowbite.plugin(),],
}