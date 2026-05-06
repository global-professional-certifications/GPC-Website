/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Roboto", ...fontFamily.serif],
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        noto: ['"Noto Sans"', 'sans-serif']
      },
      colors: {
        "brand-purple": "#a622e1",
        "brand-blue": "#3a1292",
        "brand-gray": "#6f6d7e",
        "brand-dark": "#100e28",
        "brand-contrast": "#ffcc33",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      scale: {
        "130": "1.325",
        "175": "1.75",
        "200": "2",
        "225": "2.25",
        "250": "2.5",
      },
      transitionDuration: {
        '400': '400ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
  safelist: [
    'sm:pt-[96px]',
    'sm:pt-24',
    "top-12",
    'md:pt-12',
    "lg:py-[168px]",
    "mt-[116px]",
  ]
})