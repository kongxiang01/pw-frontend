export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'], // 扫描 src 目录下的文件
  theme: {
    extend: {
      fontFamily: {
        impact: ['Impact', 'Haettenschweiler', '"Arial Narrow Bold"', 'sans-serif'],
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