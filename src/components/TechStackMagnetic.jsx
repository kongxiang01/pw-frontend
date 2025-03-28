import { useRef, useEffect } from "react";

const TechStackMagnetic = () => {
  const canvasRef = useRef(null);
  const ballsRef = useRef([]);
  const starsRef = useRef([]); // 新增：存储固定星星数据

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId = null;
    let lastTime = null;

    const techStack = [
      { name: "JS", radius: 80, color: "#FACC15", weight: 0.8 },   // 亮黄
      { name: "C", radius: 50, color: "#9CA3AF", weight: 0.4 },    // 浅灰
      { name: "C++", radius: 50, color: "#1D4ED8", weight: 0.4 },  // 深蓝
      { name: "Java", radius: 53, color: "#15803D", weight: 0.5 }, // 深绿
      { name: "Python", radius: 55, color: "#1E40AF", weight: 0.6 }, // 蓝
      { name: "CSS", radius: 80, color: "#2563EB", weight: 0.8 },  // 蓝色
      { name: "HTML", radius: 80, color: "#D97706", weight: 0.8 }, // 橙黄
      { name: "React", radius: 80, color: "#0EA5E9", weight: 0.8 }, // 青蓝
      { name: "Vue", radius: 70, color: "#16A34A", weight: 0.7 },   // 绿色
    ];

    // 初始化固定星星
    const initStars = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const stars = [];
      for (let i = 0; i < 50; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2,
          color: Math.random() > 0.5 ? "rgba(255, 255, 0, 0.5)" : "rgba(0, 255, 0, 0.5)", // 黄或绿
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

      ballsRef.current = techStack.map((tech, index) => {
        const angle = (2 * Math.PI) / techStack.length * index;
        const oriX = centerX + circleRadius * Math.cos(angle);
        const oriY = centerY + circleRadius * Math.sin(angle);
        return {
          ...tech,
          oriX,
          oriY,
          moveX: oriX,
          moveY: oriY,
          targetX: oriX,
          targetY: oriY,
          isMoving: false,
        };
      });

      initStars(); // 在 resize 时初始化星星
    };

    const updateBalls = (mouseX, mouseY) => {
      ballsRef.current.forEach((ball) => {
        const dx = ball.oriX - mouseX;
        const dy = ball.oriY - mouseY;
        const distance = Math.sqrt(dx ** 2 + dy ** 2);
        const mouseRadius = 400; // 使用常量，但可动态调整
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

      // 绘制星空背景
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
        ctx.arc(ball.oriX, ball.oriY, ball.radius / 5, 0, Math.PI * 2);
        ctx.fillStyle = "#f7f7f7";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(ball.moveX, ball.moveY, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();

        // 添加波浪水效果
        const waterHeight = ball.radius * 2 * ball.weight;
        const waterY = ball.moveY + ball.radius - waterHeight;
        ctx.save();
        ctx.beginPath();
        ctx.arc(ball.moveX, ball.moveY, ball.radius, 0, Math.PI * 2);
        ctx.clip();

        // 绘制波浪路径
        ctx.beginPath();
        ctx.moveTo(ball.moveX - ball.radius, ball.moveY + ball.radius); // 左下角
        ctx.lineTo(ball.moveX - ball.radius, waterY); // 左上角
        for (let x = -ball.radius; x <= ball.radius; x += 5) {
          const waveX = ball.moveX + x;
          const waveY = waterY + Math.sin(x * 0.1 + timestamp * 0.005) * 5; // 波浪高度和速度
          ctx.lineTo(waveX, waveY);
        }
        ctx.lineTo(ball.moveX + ball.radius, ball.moveY + ball.radius); // 右下角
        ctx.closePath();

        // 填充波浪区域
        const gradient = ctx.createLinearGradient(ball.moveX, waterY, ball.moveX, ball.moveY + ball.radius);
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0.2)");
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.restore();

        const dx = ball.oriX - ball.moveX;
        const dy = ball.oriY - ball.moveY;
        const distance = Math.sqrt(dx ** 2 + dy ** 2);
        if (distance > 5) {
          ctx.font = `${ball.radius / 2}px Arial`;
          ctx.fillStyle = "#ffffff";
          ctx.textAlign = "center";
          ctx.fillText(ball.name, ball.moveX, ball.moveY + ball.radius + 20);
          // ctx.font = `${ball.radius / 2 - 6}px Arial`;
          // ctx.fillText(`${Math.round(ball.weight * 100)}%`, ball.moveX, ball.moveY + ball.radius + 40);
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