/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0a0a0a',
          soft: '#0f172a',
        },
      },
      boxShadow: {
        'emerald-glow': '0 0 25px rgba(16, 185, 129, 0.35)',
      },
    },
  },
  plugins: [],
};
