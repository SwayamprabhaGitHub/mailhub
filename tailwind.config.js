/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scale: {
        '101': '1.01',
        '102': '1.02', // Custom scaling value for scale-102
        '108': '1.08'
      },
    },
  },
  plugins: [],
}
