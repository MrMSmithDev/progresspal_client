/** @type {import('tailwindcss').Config} */

console.log('Reading config');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{css, scss}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [],
};
