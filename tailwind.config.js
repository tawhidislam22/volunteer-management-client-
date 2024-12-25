/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        'banner-Image': "url('./src/assets/footerImage/footerImage.jpg')",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

