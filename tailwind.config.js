/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        successColor: "#2ecc71",
        errorColor: "#e74c3c",
      },
    },
  },
  plugins: [],
};
