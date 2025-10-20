// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      borderWidth: {
        '3': '3px',
      },
      boxShadow: {
        'brutal-xs': '2px 2px 0px #000000',
        'brutal-sm': '3px 3px 0px #000000',
        'brutal': '4px 4px 0px #000000',
        'brutal-lg': '6px 6px 0px #000000',
        'brutal-xl': '8px 8px 0px #000000',
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
}