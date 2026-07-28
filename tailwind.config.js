/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./views/**/*.ejs",
    "./memorandums/**/*.html",
    "./js/**/*.js",
    "./main.js",
    "./memorandums/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        'doj-brown': '#2C1810',
        'doj-tan': '#F5E6D3',
        'doj-gold': '#D4AF37',
        'doj-navy': '#0F172A',
        'doj-slate': '#1E293B',
      },
      fontFamily: {
        serif: ['Times New Roman', 'Times', 'serif'],
        sans: ['Times New Roman', 'Times', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-in': 'slideIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}