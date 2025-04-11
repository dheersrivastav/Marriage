/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
      colors: {
        'royal-gold': '#D4AF37',
        'maroon': '#800020',
        'blush-pink': '#DE7E96',
        'dark-blue': '#14213D',
        'cream': '#F7F3E8',
      },
      backgroundImage: {
        'hero-pattern': "url('/src/assets/hero-bg.jpg')",
      },
    },
  },
  plugins: [],
}