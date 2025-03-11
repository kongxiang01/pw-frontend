import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PokerDeck from "../components/PokerDeck";
import FaultText from "../components/FaultText";
import BubbleBackground from "../components/BubbleBackground";

// 注册 GSAP 的 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  useEffect(() => {}, []);

  return (
    <div className="relative min-h-screen page">
      {/* 新背景：渐变和动态气泡 */}
      {/* <BubbleBackground/> */}

      {/* 内容区域 */}
      <section className=" border-all-children pl-80 border-8 select-none relative z-10 min-h-screen flex flex-col items-center justify-center text-center text-sky-400">
        <div className="flex items-center justify-center">
          {/* 文本部分 */}
          <div className="border-2 w-full ">
            <motion.h1
              initial={{ opacity: 0, y: 50, scale: 0, rotate: -90 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: "spring", stiffness: 100, damping: 10 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-6xl font-bold mb-4"
            >
              Life is Fantastic
            </motion.h1>
            <motion.h1
              initial={{ y: 50, x: -50 }}
              animate={{
                y: [50, 0, 0],
                x: [-50, -50, 0],
              }}
              transition={{
                duration: 2,
                times: [0, 0.5, 1],
                ease: "easeInOut",
              }}
              className="text-6xl font-bold mb-4"
            >
              Life is Fantastic
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

          <div className="border-2 mb-40 mr-40">
            {/* SVG 部分 */}
            <svg
              width="440" // 原 1920 缩小为 960
              height="270" // 原 1080 缩小为 540
              viewBox="500 200 700 540" // 保持 viewBox 不变以维持比例
              fill=""
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <clipPath id="clip14_2">
                  <rect width="1920" height="1080" fill="white" fill-opacity="0" />
                </clipPath>
              </defs>
              <g clip-path="url(#clip14_2)">
                <path
                  id="矢量 1"
                  d="M725 587.5L666.5 687.5L584 505L925.5 505L859 687.5L799.5 587.5"
                  stroke="#000000"
                  stroke-opacity="1"
                  stroke-width="5"
                />
                <path
                  id="矢量 2"
                  d="M935 491C909.83 479.5 861.4 443.6 869 392C876.6 340.4 919 324.5 920.5 324.5C922 324.5 954.6 309.29 987 340.5C1019.4 371.7 1014.5 407.5 1014.5 410C1014.5 412.5 993.5 453.5 967.5 453.5C967.5 453.5 950.5 458.5 923.5 447.5C896.5 436.5 894 416.5 894 416.5C888.5 393.5 896.5 373 896.5 373C907 354 935 352 935 352C935 352 951.9 347.4 967.5 363C983.1 378.6 980.66 400.83 977.5 410C975.83 416 967.3 428 946.5 428C925.7 428 917.16 417.66 915.5 412.5C912 405.83 907.7 390.2 918.5 381C929.3 371.8 938 370.83 941 371.5C947 371.66 960.1 374.4 964.5 384C968.9 393.6 964.66 403.33 962 407C958.33 410.33 948.7 415 939.5 407C930.3 399 930.33 391.66 931.5 389M1059 453.5C1067 535.5 1006.5 570 993 570M1010 447.5C1020.4 482.3 1030.32 485.33 1034 482.5"
                  stroke="#000000"
                  stroke-opacity="1"
                  stroke-width="5"
                  fill="none"
                />
                <motion.circle
                  id="椭圆 1"
                  cx="1012.5"
                  cy="477.5"
                  r="8.5"
                  fill="#000000"
                  fill-opacity="1"
                  initial={{ y: -20, x: -5 }}
                  animate={{
                    y: [-20, -5, 5, -5, -20],
                    x: [-5, 0, 10, 0, -5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.25, 0.5, 0.75, 1],
                  }}
                />
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* 示例 Section：About */}
      <section className="border-2 relative z-10 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }} // 只有一次动画
          transition={{
            duration: 1,
          }}
          className="bg-white p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-3xl font-bold text-gray-800">About Me</h2>
          <p className="text-gray-600 mt-4">
            I'm a passionate developer with a love for creating unique web experiences.
          </p>
        </motion.div>
      </section>
      <section className="border-2 relative z-10">
        <PokerDeck />
      </section>
      <section className="border-2 relative z-10">
        <FaultText />
      </section>
      <section>
        <svg
          width="1920.000000"
          height="1080.000000"
          viewBox="0 0 1920 1080"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <clipPath id="clip14_2">
              <rect id="web 1920" width="1920.000000" height="1080.000000" fill="white" fill-opacity="0" />
            </clipPath>
          </defs>
          <rect id="web 1920" width="1920.000000" height="1080.000000" fill="#FFFFFF" fill-opacity="1.000000" />
          <g clip-path="url(#clip14_2)">
            <path
              id="矢量 1"
              d="M725 587.5L666.5 687.5L584 505L925.5 505L859 687.5L799.5 587.5"
              stroke="#000000"
              stroke-opacity="1.000000"
              stroke-width="1.000000"
            />
            <path
              id="矢量 2"
              d="M935 491C909.83 479.5 861.4 443.6 869 392C876.6 340.4 919 324.5 920.5 324.5C922 324.5 954.6 309.29 987 340.5C1019.4 371.7 1014.5 407.5 1014.5 410C1014.5 412.5 993.5 453.5 967.5 453.5C967.5 453.5 950.5 458.5 923.5 447.5C896.5 436.5 894 416.5 894 416.5C888.5 393.5 896.5 373 896.5 373C907 354 935 352 935 352C935 352 951.9 347.4 967.5 363C983.1 378.6 980.66 400.83 977.5 410C975.83 416 967.3 428 946.5 428C925.7 428 917.16 417.66 915.5 412.5C912 405.83 907.7 390.2 918.5 381C929.3 371.8 938 370.83 941 371.5C947 371.66 960.1 374.4 964.5 384C968.9 393.6 964.66 403.33 962 407C958.33 410.33 948.7 415 939.5 407C930.3 399 930.33 391.66 931.5 389M1059 453.5C1067 535.5 1006.5 570 993 570M1010 447.5C1020.4 482.3 1030.32 485.33 1034 482.5"
              stroke="#000000"
              stroke-opacity="1.000000"
              stroke-width="1.000000"
            />
            <circle id="椭圆 1" cx="1012.500000" cy="477.500000" r="8.500000" fill="#000000" fill-opacity="1.000000" />
          </g>
        </svg>
      </section>
    </div>
  );
};

export default HomePage;
