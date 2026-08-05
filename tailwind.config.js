
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        cream: "var(--color-cream)",
        beige: "var(--color-beige)",
        "dark-purple": "var(--color-dark-purple)",
        "mid-purple": "var(--color-mid-purple)",
        "golden-yellow": "var(--color-golden-yellow)",
        "soft-ink": "var(--color-soft-ink)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Fraunces', 'serif'],
      },
      boxShadow: {
        'premium': '0 10px 40px -10px rgba(46, 26, 63, 0.08)',
        'premium-hover': '0 20px 40px -10px rgba(46, 26, 63, 0.15)',
      }
    },
  },
  plugins: [],
}
