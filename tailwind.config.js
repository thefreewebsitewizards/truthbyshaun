/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'raleway': ['Raleway', 'sans-serif'],
        'coterie': ['Coterie', 'sans-serif'],
      },
      colors: {
        'brand-blue': '#19A7CE',
        'brand-dark-blue': '#146C94',
        'brand-bg': '#F6F1F1',
      },
      animation: {
        'reveal': 'reveal 5000ms ease-in-out forwards 500ms',
        'glow': 'glow 3500ms linear infinite 3000ms',
      },
      keyframes: {
        reveal: {
          '80%': {
            letterSpacing: '8px',
          },
          '100%': {
            backgroundSize: '300% 300%',
          },
        },
        glow: {
          '40%': {
            textShadow: '0 0 8px #fff',
          },
        },
      },
    },
  },
  plugins: [],
}