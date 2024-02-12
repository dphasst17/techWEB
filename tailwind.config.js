/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens:{
      'ssm':'480px',
      // => @media (min-width: 480px) { ... }
      'sm': '640px',
      // => @media (min-width: 640px) { ... }
      'smd':'700px',
      // => @media (min-width: 700px) { ... }
      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      'backgroundImage':{
        'google-linear':"linear-gradient(to left,#DB4437,#F4B400,#0F9D58,#4285F4)",
      },
      'fontFamily': {
        'BOO': ['"Fjalla One"', 'sans-serif'],
        'han':['"PT Sans Narrow"','sans-serif'],
        'honk':['Honk', 'system-ui'],
        'ps2':['Press Start 2P', 'system-ui'],
        'pr':['Protest Revolution', 'sans-serif']
      },
      colors: {
        primary: {"50":"#eff6ff","100":"#dbeafe","200":"#bfdbfe","300":"#93c5fd","400":"#60a5fa","500":"#3b82f6","600":"#2563eb","700":"#1d4ed8","800":"#1e40af","900":"#1e3a8a","950":"#172554"}
      }
    },
  },
  plugins: [],
}

