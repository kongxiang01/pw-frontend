import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Card = ({ 
    imageUrl, 
    width = 'w-80',  // 默认宽度
    height = 'h-96', // 默认高度
    title, 
    content, 
    overlayColor = 'bg-black' // 默认背景色
  }) => {
    const cardRef = useRef(null);
  
    // 滚动动画设置
    const { scrollYProgress } = useScroll({
      target: cardRef,
      offset: ["start 70%", "end 10%"]
    });
  
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, 50]);
  
    return (
      <motion.div
        ref={cardRef}
        style={{ opacity, y }}
        className={`relative ${width} ${height} mx-auto m-4 overflow-hidden rounded-xl shadow-md group`}
      >
        {/* 图片 */}
        <motion.img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-125 group-hover:blur-sm"
        />
  
        {/* Hover时显示的文字内容 */}
        <div
          className={`
            absolute inset-0 ${overlayColor} bg-opacity-60 
            flex flex-col justify-center items-center 
            opacity-0 group-hover:opacity-100 
            transition-opacity duration-300 p-4
          `}
        >
          <h3 className="text-white text-xl font-bold mb-2 text-center">
            {title}
          </h3>
          <p className="text-white text-center">
            {content}
          </p>
        </div>
      </motion.div>
    );
  };

export default Card;