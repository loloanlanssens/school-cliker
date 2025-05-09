/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'fly-up': 'fly-up 1s ease-out forwards',
      },
      keyframes: {
        'fly-up': {
          '0%': { transform: 'translateY(0)', opacity: 1 },
          '100%': { transform: 'translateY(-40px)', opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};