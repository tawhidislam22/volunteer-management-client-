/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'footer-Image': "url('./src/assets/footerImage/footerImage.jpg')",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

