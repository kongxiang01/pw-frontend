import { useRef, useEffect } from "react";

const TechStackMagnetic = () => {
  const canvasRef = useRef(null);
  const ballsRef = useRef([]);
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId = null;
    let lastTime = null;

    // 使用 rem 单位的 techStack
    const techStack = [
      { name: "JS", radius: 5, color: "#FACC15", weight: 0.8 },    // 5rem
      { name: "C", radius: 3, color: "#9CA3AF", weight: 0.4 },     // 3rem
      { name: "C++", radius: 3, color: "#1D4ED8", weight: 0.4 },   // 3rem
      { name: "Java", radius: 3.3, color: "#15803D", weight: 0.5 }, // 3.3rem
      { name: "Python", radius: 3.5, color: "#1E40AF", weight: 0.6 }, // 3.5rem
      { name: "CSS", radius: 5, color: "#2563EB", weight: 0.8 },   // 5rem
      { name: "HTML", radius: 5, color: "#D97706", weight: 0.8 },  // 5rem
      { name: "React", radius: 5, color: "#0EA5E9", weight: 0.8 }, // 5rem
      { name: "Vue", radius: 4.5, color: "#16A34A", weight: 0.7 },  // 4.5rem
    ];

    // 获取根字体大小（rem 的基准）
    const getRemInPixels = () => {
      return parseFloat(getComputedStyle(document.documentElement).fontSize) || 16; // 默认 16px
    };

    const initStars = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const stars = [];
      for (let i = 0; i < 50; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2,
          color: Math.random() > 0.5 ? "rgba(255, 255, 0, 0.5)" : "rgba(0, 255, 0, 0.5)",
        });
      }
      starsRef.current = stars;
    };

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      const centerX = width / 2;
      const centerY = height / 2;
      const circleRadius = Math.min(width, height) * 0.3;
      const remToPx = getRemInPixels(); // 计算 rem 到 px 的转换

      ballsRef.current = techStack.map((tech, index) => {
        const angle = (2 * Math.PI) / techStack.length * index;
        const oriX = centerX + circleRadius * Math.cos(angle);
        const oriY = centerY + circleRadius * Math.sin(angle);
        return {
          ...tech,
          radiusPx: tech.radius * remToPx, // 将 rem 转换为像素
          oriX,
          oriY,
          moveX: oriX,
          moveY: oriY,
          targetX: oriX,
          targetY: oriY,
          isMoving: false,
        };
      });

      initStars();
    };

    const updateBalls = (mouseX, mouseY) => {
      ballsRef.current.forEach((ball) => {
        const dx = ball.oriX - mouseX;
        const dy = ball.oriY - mouseY;
        const distance = Math.sqrt(dx ** 2 + dy ** 2);
        const mouseRadius = 400; // 可改为动态值
        const effectiveRadius = mouseRadius * ball.weight;

        if (distance <= effectiveRadius) {
          ball.targetX = mouseX + (dx / distance) * effectiveRadius;
          ball.targetY = mouseY + (dy / distance) * effectiveRadius;
          ball.isMoving = true;
        } else if (ball.isMoving) {
          ball.targetX = ball.oriX;
          ball.targetY = ball.oriY;
          ball.isMoving = false;
        }
      });
    };

    const animate = (timestamp) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = (timestamp - lastTime) / 1000;
      lastTime = timestamp;

      ctx.fillStyle = "#171717";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      starsRef.current.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();
      });

      ballsRef.current.forEach((ball) => {
        const easing = (ball.isMoving ? 0.02 : 0.01) * deltaTime * 60;
        ball.moveX += (ball.targetX - ball.moveX) * easing;
        ball.moveY += (ball.targetY - ball.moveY) * easing;

        ctx.beginPath();
        ctx.moveTo(ball.oriX, ball.oriY);
        ctx.lineTo(ball.moveX, ball.moveY);
        ctx.strokeStyle = "#f7f7f7";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(ball.oriX, ball.oriY, ball.radiusPx / 5, 0, Math.PI * 2);
        ctx.fillStyle = "#f7f7f7";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(ball.moveX, ball.moveY, ball.radiusPx, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();

        // 添加波浪水效果
        const waterHeight = ball.radiusPx * 2 * ball.weight;
        const waterY = ball.moveY + ball.radiusPx - waterHeight;
        ctx.save();
        ctx.beginPath();
        ctx.arc(ball.moveX, ball.moveY, ball.radiusPx, 0, Math.PI * 2);
        ctx.clip();

        ctx.beginPath();
        ctx.moveTo(ball.moveX - ball.radiusPx, ball.moveY + ball.radiusPx);
        ctx.lineTo(ball.moveX - ball.radiusPx, waterY);
        for (let x = -ball.radiusPx; x <= ball.radiusPx; x += 5) {
          const waveX = ball.moveX + x;
          const waveY = waterY + Math.sin(x * 0.1 + timestamp * 0.005) * 5;
          ctx.lineTo(waveX, waveY);
        }
        ctx.lineTo(ball.moveX + ball.radiusPx, ball.moveY + ball.radiusPx);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(ball.moveX, waterY, ball.moveX, ball.moveY + ball.radiusPx);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0.2)");
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.restore();

        const dx = ball.oriX - ball.moveX;
        const dy = ball.oriY - ball.moveY;
        const distance = Math.sqrt(dx ** 2 + dy ** 2);
        if (distance > 5) {
          ctx.font = `${ball.radiusPx / 2}px Arial`;
          ctx.fillStyle = "#ffffff";
          ctx.textAlign = "center";
          ctx.fillText(ball.name, ball.moveX, ball.moveY + ball.radiusPx + 20);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const moveBalls = (e) => {
      const { left, top } = canvas.getBoundingClientRect();
      const mouseX = e.x - left;
      const mouseY = e.y - top;
      updateBalls(mouseX, mouseY);
    };

    resize();
    window.addEventListener("mousemove", moveBalls);
    window.addEventListener("resize", resize);
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", moveBalls);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default TechStackMagnetic;