import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PokerDeck from "../components/PokerDeck";
import FaultText from "../components/FaultText";

// 注册 GSAP 的 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  useEffect(() => {

   // 风沙动画（无限循环）
    gsap.to(".wind-sand-particle", {
      x: "-100vw",
      repeat: -1,
      duration: 10,
      ease: "none",
    });

    // 风沙动画（无限循环）
    gsap.to(".wind-sand-particle", {
      x: "-100vw",
      repeat: -1,
      duration: 10,
      ease: "none",
    });

    // 背景渐变色循环动画
    gsap.to(".bg-gradient", {
      background: "linear-gradient(to bottom, #B3CDE0, #EDC9AF, #5C4033)",
      duration: 10,
      repeat: -1,
      yoyo: true,
    });
  }, []);
  
  return (
    <div className="relative min-h-screen overflow-hidden page">
      {/* 基础背景：渐变天空与沙地 */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#B3CDE0] to-[#5C4033] bg-gradient" />


      {/* 中景：风沙（CSS 粒子） */}
      <div className="fixed inset-0 z-4">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="wind-sand-particle absolute bg-[#EDC9AF] opacity-30 rounded-full"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}vh`,
              left: `${Math.random() * 100}vw`,
              animation: `wind ${Math.random() * 5 + 5}s linear infinite`,
            }}
          />
        ))}
      </div>

      {/* 前景：枯树（SVG） */}
      <motion.svg
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="fixed bottom-0 left-10 w-32 h-auto"
        viewBox="0 0 100 100"
        style={{ zIndex: 5 }}
      >
        <path
          d="M50,10 L50,80 M30,30 L50,10 L70,30 M40,50 L50,30 L60,50"
          stroke="#5C4033"
          strokeWidth="2"
          fill="none"
        />
      </motion.svg>

      {/* 内容区域 */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl font-bold mb-4"
        >
          Welcome to My Desert Oasis
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-xl"
        >
          Scroll down to explore more.
        </motion.p>
      </div>

      {/* 示例 Section：About */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-3xl font-bold text-gray-800">About Me</h2>
          <p className="text-gray-600 mt-4">
            I'm a passionate developer with a love for creating unique web experiences.
          </p>
        </motion.div>
      </div>
      <div className="relative z-10">
        <PokerDeck></PokerDeck>
        <FaultText></FaultText>
      </div>
    </div>
  );
};

export default HomePage;
