/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      colors: {
        'cyber-glitch': '#ff00ff',
        'matrix-green': '#00ff00'
      },
      boxShadow: {
        'neon': '0 0 15px rgba(0, 255, 0, 0.5)'
      }
    }
  },
  plugins: [],
}