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

