import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

// 随机生成颜色
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const ProjectCard = ({
  projectNumber,
  images,
  title,
  dateRange,
  projectDescription,
  techStack,
  responsibilities,
  imageAlt,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bgColor, setBgColor] = useState(getRandomColor());
  // 上一张图片逻辑
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // 下一张图片逻辑
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  // 点击背景切换颜色
  const handleBgClick = () => {
    setBgColor(getRandomColor());
  };

  // 3D 动画变体
  const carouselVariants = {
    active: {
      x: 0,
      scale: 1,
      opacity: 1,
      rotateY: 0,
      zIndex: 10,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    prev: {
      x: "-40%",
      scale: 0.75,
      opacity: 0.2,
      rotateY: -40,
      zIndex: 5,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    next: {
      x: "40%",
      scale: 0.75,
      opacity: 0.2,
      rotateY: 40,
      zIndex: 5,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    hidden: {
      opacity: 0,
      scale: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div
      className="scroll-card relative w-[65rem] h-[40rem] rounded-[5rem] mx-10 flex-shrink-0 
                flex flex-col items-center justify-center mt-12"
      style={{ backgroundColor: bgColor }}
      onClick={handleBgClick}
    >
      <span className="absolute -top-32 font-impact text-[6rem] text-my-yellow tracking-wider">
        PROJECT
        <span className="text-[6rem] text-transparent" style={{ WebkitTextStroke: "3px #ffffff" }}>
          {` 0${projectNumber}`}
        </span>
      </span>

      <div></div>
      {/* 图片container */}
      <div className="relative w-2/3 h-2/3 mt-6 rounded-md perspective-1000">
        <AnimatePresence initial={false}>
          {images.map((imgSrc, index) => {
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + images.length) % images.length;
            const isNext = index === (currentIndex + 1) % images.length;
            if (!isActive && !isPrev && !isNext) return null;
            return (
              <motion.img
                key={imgSrc}
                src={imgSrc}
                alt={imageAlt || `Project ${projectNumber} - Image ${index + 1}`}
                className="absolute w-full h-full object-cover"
                variants={carouselVariants}
                initial="hidden"
                animate={isActive ? "active" : isPrev ? "prev" : isNext ? "next" : "hidden"}
                exit="hidden"
                style={{ transformStyle: "preserve-3d" }}
              />
            );
          })}
        </AnimatePresence>

        {/* 控制按钮 */}
        <button
          onClick={handlePrev}
          className="absolute -left-1/4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition z-10"
        >
          上一页
        </button>
        <button
          onClick={handleNext}
          className="absolute -right-1/4 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition z-10"
        >
          下一页
        </button>
      </div>

      {/* 描述区域 - 占 1/3 高度 */}
      <div className="relative mt-8 w-full h-1/3 flex flex-col text-white">
        <div className="title justify-start">
          <span className="ml-8 font-serif text-5xl tracking-wider">{title}</span>
          <span className="ml-24">{dateRange}</span>
        </div>
        <div className="ml-12 leading-8 font-serif text-xl tracking-wider">
          <div>{projectDescription}</div>
          <p>项目技术：{techStack}</p>
          <p>{responsibilities}</p>
        </div>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  projectNumber: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  description: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
};

// 默认 props（可选）
ProjectCard.defaultProps = {
  projectNumber: 99,
  imageSrc: "/assets/stuff/david.png",
  description: "敬请期待",
  imageAlt: "图片加载失败",
};

export default ProjectCard;
