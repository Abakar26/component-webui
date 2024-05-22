/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'custom-image': 'url(\'./images/pictures/adaptic_bg.png\')',
      }),
    },
  },
  plugins: [

  ],
};
