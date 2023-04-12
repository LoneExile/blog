/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  daisyui: {
    // TODO: #003 fix colors
    themes: ['luxury' /* , 'cupcake' */],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
