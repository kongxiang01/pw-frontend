export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // 扫描 src 目录下的文件
  theme: {
    extend: {
      colors:{
        'black': '#171717',
        'my-blue': '#3195b5',
        'my-pink': '#f6bac6',
        'my-brown1': '#924d2e',
        'my-brown2': '#2a1a19',
        'my-orange': '#e6864a',
        'my-yellow': '#EFDB00',
        'my-green': '#17f700',
      },

      fontFamily: {
        impact: ['Impact', 'Haettenschweiler', '"Arial Narrow Bold"', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif'],
        cyberpunk: ['Cyberpunk', 'Orbitron', 'sans-serif'],
      },
      animation: {
        moveVertical: 'moveVertical 10s infinite',
        moveInCircle: 'moveInCircle 20s infinite',
        moveInCircleReverse: 'moveInCircleReverse 20s infinite',
        moveHorizontal: 'moveHorizontal 15s infinite',
      },
      keyframes: {
        moveVertical: {
          '0%, 100%': { transform: 'translateY(-20%)' },
          '50%': { transform: 'translateY(20%)' },
        },
        moveInCircle: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        moveInCircleReverse: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        moveHorizontal: {
          '0%, 100%': { transform: 'translateX(-20%)' },
          '50%': { transform: 'translateX(20%)' },
        },
      },
    },
  },
  plugins: [],
};