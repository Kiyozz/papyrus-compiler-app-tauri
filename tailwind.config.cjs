/*
 * Copyright (c) 2023 Kiyozz~WK~WushuLate.
 *
 * All rights reserved.
 *
 */

const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f2f6fc',
          100: '#e2ebf7',
          200: '#cbdcf2',
          300: '#a7c6e9',
          400: '#81aade',
          500: '#5e89d3',
          600: '#4a70c6',
          700: '#405eb5',
          800: '#394e94',
          900: '#324476',
          950: '#232b48',
          bg: '#faf0f9',
          content: '#ffffff',
        },
        secondary: { '0': '#f8f6f4',
          100: '#efece5',
          200: '#ddd6cb',
          300: '#beaf9b',
          400: '#b09b87',
          500: '#a0866f',
          600: '#937663',
          700: '#7b6153',
          800: '#655147',
          900: '#53423b',
          950: '#2c221e',
          bg: '#f8f6f4',
          content: '#7b6153',
        },

      },
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
      transitionTimingFunction: {
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@headlessui/tailwindcss', { prefix: 'ui' }),
    plugin(function ({
      addVariant,
    }) {
      addVariant('aria-not-disabled', ['&:not([aria-disabled="true"])'])
      addVariant('aria-invalid', ['&[aria-invalid="true"]'])
      addVariant('group-aria-invalid', ':merge(.group)[aria-invalid="true"] &')
      addVariant('group-aria-not-disabled', ':merge(.group):not([aria-disabled="true"]) &')
    })
  ],
}
