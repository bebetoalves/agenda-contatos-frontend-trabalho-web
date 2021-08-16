module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: ['Heebo'],
      display: ['Quicksand'],
    },
    extend: {
      colors: {
        'fuchsia-blue': {
          DEFAULT: '#743DBF',
          50: '#F0E9F8',
          100: '#E2D6F2',
          200: '#C6AFE6',
          300: '#AB89D9',
          400: '#8F62CD',
          500: '#743DBF',
          600: '#5D3198',
          700: '#452472',
          800: '#2E184B',
          900: '#160C24',
        },
        java: {
          DEFAULT: '#19CDBF',
          50: '#D2FAF6',
          100: '#BBF7F2',
          200: '#8EF1E9',
          300: '#60ECE1',
          400: '#33E6D8',
          500: '#19CDBF',
          600: '#13A095',
          700: '#0E726A',
          800: '#084540',
          900: '#031716',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
