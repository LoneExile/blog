/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  daisyui: {
    themes: [
      {
        dark: {
          ...require('daisyui/src/theming/themes')['[data-theme=business]'],
          fontFamily: 'Chalkboard',
        },
        light: {
          ...require('daisyui/src/theming/themes')['[data-theme=emerald]'],
          fontFamily: 'Chalkboard',
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
