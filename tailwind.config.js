/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#000000',
        accent: '#ffffff',
        surface: '#ffffff',
      },
      boxShadow: {
        soft: '0 10px 60px rgba(0,0,0,0.05)',
        boutique: '0 0 0 1px rgba(0,0,0,0.1)',
      }
    }
  },
  plugins: [],
}
