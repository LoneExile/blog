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
    themes: [
      {
        night: {
          // ...require("daisyui/src/theming/themes")["[data-theme=night]"],
          primary: '#3abff8',
          secondary: '#828df8',
          accent: '#f471b5',
          neutral: '#1d283a',
          'base-100': '#0f1729',
          info: '#0ca6e9',
          success: '#2bd4bd',
          warning: '#f4c152',
          error: '#fb6f84',
          fontFamily: 'Chalkboard',
        },
        lemonade: {
          ...require('daisyui/src/theming/themes')['[data-theme=lemonade]'],
          fontFamily: 'Chalkboard',
        },
      },
      // 'night',
      // 'wireframe',
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
