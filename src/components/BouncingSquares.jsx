import { useEffect, useRef } from 'react';

const BouncingSquares = () => {
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const shootRef = useRef(false);

  useEffect(() => {
    const cnv = canvasRef.current;
    const c = cnv.getContext('2d');
    const w = (cnv.width = window.innerWidth * 2);
    const h = (cnv.height = window.innerHeight * 2);
    cnv.style.width = `${window.innerWidth}px`;
    cnv.style.height = `${window.innerHeight}px`;

    const { sqrt, cos, sin, random: rnd } = Math;
    let pnts = [];
    const num = 23;

    // 计算点到线段的最短距离
    const lineDist = (x1, y1, x2, y2, x3, y3) => {
      let dx = x2 - x1;
      let dy = y2 - y1;
      if (dx === 0 && dy === 0) dx = dy = 1;
      const u = ((x3 - x1) * dx + (y3 - y1) * dy) / (dx * dx + dy * dy);
      const cx = u < 0 ? x1 : u > 1 ? x2 : x1 + u * dx;
      const cy = u < 0 ? y1 : u > 1 ? y2 : y1 + u * dy;
      return sqrt((cx - x3) ** 2 + (cy - y3) ** 2);
    };

    // 绘制山脉线并返回重绘函数
    const mount = () => {
      c.beginPath();
      c.moveTo(0, h - 100);
      const step = w / num;
      for (let i = 0; i <= num; i++) {
        const x = step * i;
        const y = h - 600 - 450 * cos(2 + i / 8) + 50 * sin(i * 0xFFFFF);
        pnts[i] = [x, y];
        c.lineTo(x, y);
      }
      c.stroke();
      return () => {
        c.beginPath();
        c.moveTo(0, h - 100);
        for (let i = 0; i <= num; i++) {
          c.lineTo(pnts[i][0], pnts[i][1]);
        }
        c.stroke();
      };
    };

    // 反弹计算
    const reflect = (vx, vy, ax, ay, bx, by) => {
      const rst = 0.99;
      let dx = bx - ax;
      let dy = by - ay;
      const len = sqrt(dx * dx + dy * dy);
      dx /= len;
      dy /= len;
      const nx = -dy;
      const ny = dx;
      const dot = vx * nx + vy * ny;
      vx = 0.5 * (vx - (1 + rst) * dot * nx);
      vy = 0.5 * (vy - (1 + rst) * dot * ny);
      return [vx, vy];
    };

    // 创建单个方块的运动逻辑
    const dot = (off) => {
      let x = w / 2 - 140 + off;
      let y = h / 4;
      let ox = x;
      let oy = y;
      let vx = rnd() * 10 - 5;
      let vy = rnd() * -10;
      const s = 20;
      const g = 0.3 + rnd() * 0.2;

      return () => {
        x += vx;
        y += vy;

        if (shootRef.current) {
          vy = rnd() * -20;
          vx = rnd() * 10 - 5;
          x = ox;
          y = oy;
        }

        let intersect = false;
        for (let i = 0; i < num - 1; i++) {
          const a = pnts[i];
          const b = pnts[i + 1];
          const d = lineDist(a[0], a[1], b[0], b[1], x, y);
          if (d < s) {
            [vx, vy] = reflect(vx, vy, a[0], a[1], b[0], b[1]);
            x = ox;
            y = oy;
            intersect = true;
            break;
          }
        }

        vy += g;
        if (!intersect) {
          ox = x;
          oy = y;
        }
        c.fillStyle = 'red';
        c.fillRect(x, y, s, s);
      };
    };

    // 初始化山脉和方块
    const g = mount();
    const NUM = 200;
    dotsRef.current = [];
    for (let i = 0; i < NUM; i++) {
      dotsRef.current[i] = dot(i * 4 - 200);
    }

    // 动画循环
    const loop = () => {
      c.fillStyle = 'white';
      c.fillRect(0, 0, w, h);
      g();
      dotsRef.current.forEach((d) => d());
      shootRef.current = false;
      requestAnimationFrame(loop);
    };
    loop();

    // 点击事件
    const handlePointerDown = () => {
      shootRef.current = true;
    };
    cnv.addEventListener('pointerdown', handlePointerDown);

    // 清理事件监听器
    return () => {
      cnv.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  return (
    <div className="w-full h-full overflow-hidden cursor-pointer">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default BouncingSquares;