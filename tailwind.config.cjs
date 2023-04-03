/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var',...defaultTheme.fontFamily.sans],
        mono: ['IBM Plex Mono', ...defaultTheme.fontFamily.mono],
      },
      boxShadow: {
        b: '0 1px 0 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      },
      minHeight: {
        'app': 'calc(100vh - 64px)',
      },
      colors: {
        darker: '#16161a',
        light: {
          300: '#faf7f7',
          400: '#f6f0f1',
          600: '#eae5e6',
          700: '#dddada',
          800: '#cac4c4',
        },
        black: {
          400: '#403e41',
          600: '#2e292d',
          800: '#000',
        },
        primary: {
          400: '#3388ff',
          500: '#418aea',
          600: '#3279d7',
        },
        secondary: {
          400: '#3fc68e',
          500: '#35bc84',
          600: '#27a571',
        },
      },
      transitionTimingFunction: {
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

