/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      orange: {
        DEFAULT: '#D95D39',
      },
      charcoal: {
        darkest: '#121212',
        DEFAULT: '#2C2C2C',
        light: '#4B4B4B',
      },
      beige: {
        darkest: '#D6CFC4',
        DEFAULT: '#E8E1D9',
        light: '#F4F1EB',
      },
      white: {
        DEFAULT: '#FFFFFF',
      }
    },
    backgroundColor: {
      primary: '#E8E1D9',
      dark: '#D6CFC4',
      light: '#F4F1EB',
      orange: '#D95D39',
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
