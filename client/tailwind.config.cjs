/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: ['emerald'],
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
