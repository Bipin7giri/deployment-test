/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        danger: {
          // red
          DEFAULT: '#F53F3F',
          '2': '#A1151E',
          '3': '#FBACA3',
          '4': '#FFECE8',
        },
        success: {
          // green
          DEFAULT: '#00B42A',
          '2': '#008026',
          '3': '#7BE188',
          '4': '#E8FFEA',
        },
        info: {
          // blue
          DEFAULT: '#3491FA',
          '2': '#072CA6',
          '3': '#9FD4FD',
          '4': '#E8F7FF',
        },
        primary: {
          // black
          DEFAULT: '#1D2129',
          '2': '#000000',
          '3': '#4E5969',
          '4': '#86909C',
        },
        secondary: {
          // white
          DEFAULT: '#FFFFFF',
        },
        description: {
          DEFAULT: '#C9CDD4',
          '2': '#86909C',
          '3': '#C9CDD4',
        },
      },
    },
  },
  plugins: [],
};
