export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        mainColor: '#b86935'
      },
      keyframes: {
        'scroll-left': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        'scroll-left': 'scroll-left 150s linear infinite'
      }
    }
  },
  plugins: []
}
