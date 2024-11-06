/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
  theme: {
      extend: {
          spacing: {
              '128': '32rem',
              '176': '44rem',
          },
          colors: {
              'canva': '#5271ff',
          },
      },
  },
  plugins: [],
}

