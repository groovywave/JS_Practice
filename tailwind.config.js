/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        successColor: '#2ecc71',
        errorColor: '#e74c3c'
      }
    }
  },
  plugins: [require('@tailwindcss/container-queries')]
};
