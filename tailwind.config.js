const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      orange: {
        DEFAULT: '#D95D39', // sophisticated burnt orange
      },
      charcoal: {
        darkest: '#121212',  // deeper, richer near-black
        DEFAULT: '#2C2C2C',  // strong body text color
        light: '#4B4B4B',    // secondary text, subtitles
      },
      beige: {
        darkest: '#D6CFC4',  // darker muted beige
        DEFAULT: '#E8E1D9',  // primary background beige
        light: '#F4F1EB',    // lighter sections if needed
      },
      white: {
        DEFAULT: '#FFFFFF',
      }
    },
    backgroundColor: {
      primary: '#E8E1D9',   // slightly darker beige for background
      dark: '#D6CFC4',      // muted beige for alt sections
      light: '#F4F1EB',     // lighter spot background if needed
      orange: '#D95D39',    // accent background
    }
  },
  variants: {
    extend: {},
  },
    plugins: [
      require('@tailwindcss/typography'),
    ]
}
