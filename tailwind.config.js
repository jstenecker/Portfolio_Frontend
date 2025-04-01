/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
 
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        secondary: 'var(--color-secondary)',
        background: 'var(--color-background)',
        card: 'var(--color-card)',
        text: 'var(--color-text)',
      },

      fontFamily: {
        inter: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },

      spacing: {
        'hero-height': '300px',
      },
  
      backgroundSize: {
        '400': '400% 400%',
      },

      animation: {
        'gradient-move': 'gradientMove 15s ease infinite',
      },
      
      keyframes: {
        gradientMove: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
};
