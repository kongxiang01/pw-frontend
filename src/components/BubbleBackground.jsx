// components/BubbleBackground.jsx
import React, { useEffect } from "react";

const BubbleBackground = () => {
  useEffect(() => {
    // 交互气泡的鼠标移动效果
    const interBubble = document.querySelector(".interactive");
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    const move = () => {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      requestAnimationFrame(move);
    };

    window.addEventListener("mousemove", (event) => {
      tgX = event.clientX;
      tgY = event.clientY;
    });

    move();

    // 清理事件监听器
    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-0 w-full h-screen overflow-hidden"
      style={{
        background: "linear-gradient(40deg, rgb(108, 0, 162), rgb(0, 17, 82))",
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className="w-full h-full" style={{ filter: "url(#goo) blur(10px)" }}>
        {/* g1 */}
        <div
          className="absolute w-[80%] h-[80%] top-[calc(50%-40%)] left-[calc(50%-40%)] animate-moveVertical opacity-100"
          style={{
            background: "radial-gradient(circle at center, rgba(18,113,255,0.8) 0%, rgba(18,113,255,0) 50%)",
            mixBlendMode: "hard-light",
          }}
        />
        {/* g2 */}
        <div
          className="absolute w-[80%] h-[80%] top-[calc(50%-40%)] left-[calc(50%-40%)] animate-moveInCircleReverse opacity-100"
          style={{
            background: "radial-gradient(circle at center, rgba(221,74,255,0.8) 0%, rgba(221,74,255,0) 50%)",
            mixBlendMode: "hard-light",
            transformOrigin: "calc(50% - 400px)",
          }}
        />
        {/* g3 */}
        <div
          className="absolute w-[80%] h-[80%] top-[calc(50%-40%+200px)] left-[calc(50%-40%-500px)] animate-moveInCircle opacity-100"
          style={{
            background: "radial-gradient(circle at center, rgba(100,220,255,0.8) 0%, rgba(100,220,255,0) 50%)",
            mixBlendMode: "hard-light",
            transformOrigin: "calc(50% + 400px)",
          }}
        />
        {/* g4 */}
        <div
          className="absolute w-[80%] h-[80%] top-[calc(50%-40%)] left-[calc(50%-40%)] animate-moveHorizontal opacity-70"
          style={{
            background: "radial-gradient(circle at center, rgba(200,50,50,0.8) 0%, rgba(200,50,50,0) 50%)",
            mixBlendMode: "hard-light",
            transformOrigin: "calc(50% - 200px)",
          }}
        />
        {/* g5 */}
        <div
          className="absolute w-[160%] h-[160%] top-[calc(50%-80%)] left-[calc(50%-80%)] animate-moveInCircle opacity-100"
          style={{
            background: "radial-gradient(circle at center, rgba(180,180,50,0.8) 0%, rgba(180,180,50,0) 50%)",
            mixBlendMode: "hard-light",
            transformOrigin: "calc(50% - 800px) calc(50% + 200px)",
          }}
        />
        {/* interactive */}
        <div
          className="interactive absolute w-full h-full top-[-50%] left-[-50%] opacity-70"
          style={{
            background: "radial-gradient(circle at center, rgba(140,100,255,0.8) 0%, rgba(140,100,255,0) 50%)",
            mixBlendMode: "hard-light",
          }}
        />
      </div>
    </div>
  );
};

export default BubbleBackground;