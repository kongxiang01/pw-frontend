import React, { useEffect, useState, useRef } from "react";
import { easeIn, motion, noop, useScroll, useTransform, useMotionValue } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";
import PokerDeck from "../components/PokerDeck";
import FaultText from "../components/FaultText";
import TechStackMagnetic from "../components/TechStackMagnetic";
import ProjectCard from "../components/ProjectCard.jsx";
import Card from "../components/Card.jsx";
import BouncingSquares from "../components/BouncingSquares.jsx";

// 注册 GSAP 的 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  // 使用 useMotionValue 创建一个动画值
  const scrollProgress = useMotionValue(0);
  // 使用 useRef 存储最新的进度值（可选，仅用于调试或额外逻辑）
  // const progressRef = useRef(0);

  useLenis(({ scroll, limit }) => {
    // scroll: 当前滚动位置,bottom
    // limit: 可滚动内容的总高度 - 视口高度（即最大滚动距离）
    const progress = limit > 0 ? scroll / limit : 0; // 避免在内容高度不足以滚动时（limit === 0）出现除零错误
    // 更新 MotionValue
    scrollProgress.set(progress);
    // 更新 useRef（可选，仅用于非动画相关的逻辑）
    // progressRef.current = progress;
  });

  const sectionRef = useRef(null); // 绑定 portrait的section 以获取滚动监听目标
  const horizontalRef = useRef(null);
  const techStackRef = useRef(null);
  const basketballRef = useRef(null);
  const cardContainerRef = useRef(null);

  // 获取滚动进度
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 40%", "end 20%"], // 触发范围
  });

  // 使用滚动进度计算 clipPath 的变化
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "inset(0 0 100% 0)", // 初始完全隐藏
      "inset(0 0 0% 0)", // 最终完全显示
    ]
  );

  // 技术栈转场视差效果
  const { scrollYProgress: smoothTransition } = useScroll({
    target: techStackRef,
    offset: ["start start", "end 10%"],
  });

  const topY = useTransform(smoothTransition, [0, 1], ["0%", "30%"]);

  // 计算扫描线位置
  const scanLineY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const scanLineOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  const { scrollYProgress: cardContainerY } = useScroll({
    target: cardContainerRef,
    offset: ["start 60%", "end 10%"],
  });

  const opacity = useTransform(cardContainerY, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(cardContainerY, [0, 0.2, 0.8, 1], [50, 0, 0, 50]);

  // 在每次滚动更新时打印各个值
  // useEffect(() => {
  //   const unsubscribeScroll = clipPath.on("change", (value) => {
  //     console.log("clipPath 值:", value);
  //   });
  //   return () => unsubscribeScroll();
  // }, [clipPath]);

  // 联系方式
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // 联系方式数据
  const contactMethods = [
    {
      title: "Email",
      value: "your.email@example.com",
      link: "mailto:your.email@example.com",
    },
    {
      title: "Phone",
      value: "+86 123-4567-8900",
      link: "tel:+8612345678900",
    },
    {
      title: "GitHub",
      value: "yourusername",
      link: "https://github.com/yourusername",
    },
    {
      title: "LinkedIn",
      value: "yourname",
      link: "https://linkedin.com/in/yourname",
    },
  ];

  useEffect(() => {
    // 在组件挂载后注册动画
    const horizontalSection = horizontalRef.current;
    const cards = horizontalSection.querySelectorAll(".scroll-card");
    const basketball = basketballRef.current;

    // 计算总宽度
    const totalWidth = Array.from(cards).reduce((acc, card) => acc + card.offsetWidth + 80, 0); // 80 是 ml-20 的间距

    gsap.to(cards, {
      x: () => -(totalWidth - window.innerWidth), // 滚动距离
      ease: "none",
      scrollTrigger: {
        trigger: horizontalSection,
        pin: true, // 固定住 section
        scrub: 1, // 平滑滚动
        start: "top top",
        end: () => `+=${totalWidth - window.innerWidth}`,
        invalidateOnRefresh: true, // 在窗口大小改变时重新计算
      },
    });

    gsap.to(basketball, {
      x: "90vw", // 滚动距离
      rotation: 1440,
      ease: "none",
      scrollTrigger: {
        trigger: horizontalSection,
        scrub: 1, // 平滑滚动
        start: "top top",
        end: () => `+=${totalWidth - window.innerWidth}`,
        invalidateOnRefresh: true, // 在窗口大小改变时重新计算
      },
    });

    // 清理函数
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <ReactLenis root>
      <div className="relative w-full bg-black overflow-x-hidden">
        {/* 进度条 */}
        <motion.div
          className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-my-yellow"
          style={{
            scaleX: scrollProgress,
          }}
        />
        <header className="fixed w-full h-10 flex justify-between items-center">
          <div></div>
          <div>
            <button></button>
            <button></button>
          </div>
        </header>
        {/* <BubbleBackground/> */}
        {/* <CyberBackground /> */}
        {/* 第一幕，内容区域 */}
        <section className="select-none relative z-10 min-h-screen flex flex-col items-center justify-center text-center mb-60">
          {/* 背景线条 */}
          <div className="absolute justify-center items-center w-full h-full opacity-30">
            {/* 第一条 */}
            <motion.div
              animate={{
                backgroundPosition: ["200% 0%", "0% 0%"], // 让射线从左到右射出
              }}
              transition={{
                duration: 20,
                delay: 2,
                repeat: Infinity, // 无限循环
                ease: "linear", // 线性动画让射线匀速移动
              }}
              className="absolute w-[120vw] h-[0.1rem] top-[10%] -left-8 -rotate-12"
              style={{
                background: "linear-gradient(90deg, #00000000, #17f700)", // 渐变方向：从左到右
                backgroundSize: "200% 100%", // 确保射线有足够的运动空间
                filter: "drop-shadow(0px 0px 10px #17f700)",
              }}
            />
            {/* 第二条 */}
            <motion.div
              animate={{
                backgroundPosition: ["200% 0%", "0% 0%"], // 让射线从左到右射出
              }}
              transition={{
                duration: 20,
                delay: 10,
                repeat: Infinity, // 无限循环
                ease: "linear", // 线性动画让射线匀速移动
              }}
              className="absolute w-[80vw] h-[0.1rem] top-36 -right-24 rotate-[30deg]" //
              style={{
                background: "linear-gradient(90deg, #00000000, #17f700)", // 渐变方向：从左到右
                backgroundSize: "200% 100%", // 确保射线有足够的运动空间
                filter: "drop-shadow(0px 0px 10px #17f700)",
              }}
            />
            {/* 第三条 */}
            <motion.div
              animate={{
                backgroundPosition: ["200% 0%", "0% 0%"], // 让射线从左到右射出
              }}
              transition={{
                duration: 25,
                delay: 0,
                repeat: Infinity, // 无限循环
                ease: "linear", // 线性动画让射线匀速移动
              }}
              className="absolute w-[150vw] h-[0.1rem] bottom-52 -left-48 -rotate-[30deg]" //
              style={{
                background: "linear-gradient(90deg, #00000000, #17f700)", // 渐变方向：从左到右
                backgroundSize: "200% 100%", // 确保射线有足够的运动空间
                filter: "drop-shadow(0px 0px 10px #17f700)",
              }}
            />
            {/* 第四条 */}
            <motion.div
              animate={{
                backgroundPosition: ["200% 0%", "0% 0%"], // 让射线从左到右射出
              }}
              transition={{
                duration: 20,
                delay: 15,
                repeat: Infinity, // 无限循环
                ease: "linear", // 线性动画让射线匀速移动
              }}
              className="absolute w-[200vw] h-[0.1rem] -rotate-[75deg] bottom-48 -left-[90%]"
              style={{
                background: "linear-gradient(90deg, #00000000, #17f700)", // 渐变方向：从左到右
                backgroundSize: "200% 100%", // 确保射线有足够的运动空间
                filter: "drop-shadow(0px 0px 10px #17f700)",
              }}
            />
            {/* 第五条 */}
            <motion.div
              animate={{
                backgroundPosition: ["200% 0%", "0% 0%"], // 让射线从左到右射出
              }}
              transition={{
                duration: 20,
                delay: 8,
                repeat: Infinity, // 无限循环
                ease: "linear", // 线性动画让射线匀速移动
              }}
              className="absolute w-[120vw] h-[0.1rem] bottom-[10%] -left-8 rotate-12" //
              style={{
                background: "linear-gradient(90deg, #00000000, #17f700)", // 渐变方向：从左到右
                backgroundSize: "200% 100%", // 确保射线有足够的运动空间
                filter: "drop-shadow(0px 0px 10px #17f700)",
              }}
            />
          </div>

          {/* 主体部分 */}
          <div className="absolute w-[65rem] h-[32rem]">
            {/* svg-nobody */}
            <div className="absolute left-16 top-12">
              <motion.svg
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                width="100"
                viewBox="0 0 200 200"
              >
                {/* 定义圆形路径 */}
                <path id="circlePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" fill="none" />
                {/* 文字沿着路径排列 */}
                <text className="font-impact tracking-[0.142rem] z-10 text-white text-3xl">
                  <motion.textPath
                    href="#circlePath"
                    startOffset="0%"
                    animate={{ startOffset: ["-100%", "0%"] }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    fill="#17f700"
                  >
                    JUST A NOBODY · JUST A NOBODY · JUST A NOBODY · JUST A NOBODY ·
                  </motion.textPath>
                </text>
                <circle cx="75" cy="65" r="8" fill="#17f700"></circle>
                <circle cx="140" cy="80" r="8" fill="#17f700"></circle>
                <path
                  d="M120,80c0,0-4.5-10-17.5-8.5c-8.5,1.5-12.5,6-15.5,12.5c-3,6.5-7,12.5-15.5,12.5s-12.5-5-15.5-12.5c-3-7.5-7-12.5-15.5-12.5c-8.5,0-12.5,5-15.5,12.5s-7,12.5-15.5,12.5c-8.5,0-12.5-6-15.5-12.5s-7-11.5-15.5-12.5c-13-1.5-17.5,8.5-17.5,8.5"
                  stroke="#17f700"
                  stroke-opacity="1"
                  stroke-width="5"
                  fill="none"
                  className="rotate-12 translate-x-20 translate-y-14 scale-75"
                ></path>
              </motion.svg>
            </div>
            <div className="absolute right-32 top-40">
              <img src="/assets/photos/key.png" alt="key加载失败" className="w-48 h-48" />
            </div>
            {/* 文本部分 */}
            <motion.div
              animate={{ x: [-150, 0], opacity: [0, 1] }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute w-[65rem] h-[32rem] top-0"
            >
              <div
                className="relative inline-block text-[11rem] font-impact leading-none tracking-wide text-my-yellow
                        after:content-['PATIENCE'] after:absolute after:top-[6px] after:left-[6px] after:text-my-yellow after:opacity-40 "
              >
                PATIENCE
              </div>
              <div
                className="text-[11rem] font-impact leading-none tracking-wide text-my-yellow"
                style={{ WebkitTextStroke: "3px #EFDB00" }}
              >
                <span className="text-transparent">IS </span>
                <span className="text-my-green">KEY</span>
              </div>

              <div className="text-[11rem] font-impact leading-none tracking-wide text-my-yellow">IN LIFE !</div>
            </motion.div>
          </div>

          {/* logo */}
          <div className="absolute translate-x-[160%] -translate-y-4">
            <svg
              width="200" // 原 1920 缩小为 960
              height="160" // 原 1080 缩小为 540
              viewBox="750 300 350 400" // 保持 viewBox 不变以维持比例
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip14_2)">
                <path
                  id="矢量 2"
                  d="M930 510C904.83 498.5 856.4 462.6 864 411C871.6 359.4 913.5 346.5 913.5 346.5C913.5 346.5 923.03 341.37 944.87 343.04C957.1 343.98 970.36 348.29 982 359.5C1014.4 390.7 1006 426.5 1006 429C1006 431.5 988.5 472.5 962.5 472.5C962.5 472.5 946.5 476.5 919.5 465.5C892.5 454.5 889 435.5 889 435.5C883.5 412.5 893 393 893 393C903.5 374 930 371 930 371C930 371 951.4 364.9 967 380.5C973.72 387.22 979.01 398.78 980 406.5C981.3 416.69 976.8 423.78 975 429C973.33 435 962.3 447 941.5 447C920.7 447 912.16 436.66 910.5 431.5C907 424.83 902.7 408.2 913.5 399C924.3 389.8 933 388.33 936 389C942 389.16 953.1 392.9 957.5 402.5C961.9 412.1 955.16 419.33 952.5 423C948.83 426.33 937.7 428.5 928.5 420.5M1059 453.5C1067 535.5 1006.5 570 993 570M1009.5 453.5C1019.9 488.3 1030.82 484.83 1034.5 482"
                  stroke="#ffffff"
                  stroke-opacity="1"
                  stroke-width="5"
                />
                <motion.circle
                  id="椭圆 1"
                  cx="1012.5"
                  cy="477.5"
                  r="8.5"
                  stroke="#ffffff"
                  fill="#ffffff"
                  fill-opacity="1"
                  initial={{ y: -20, x: -5 }}
                  animate={{
                    y: [-18, -3, 8, -3, -18],
                    x: [-5, 0, 10, 0, -5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.25, 0.5, 0.75, 1],
                  }}
                />
                <path
                  id="矢量 3"
                  d="M903.22 512.87C839.62 475.27 776.72 513.2 753.22 536.87C734.55 597.03 711.12 703.17 766.72 646.37C822.32 589.57 876.42 619.57 903.22 646.37C930.02 673.17 917.92 579.97 930.72 546.37C943.52 512.77 956.05 519.7 960.72 527.37"
                  stroke="#ffffff"
                  stroke-opacity="1"
                  stroke-width="5"
                />
              </g>
            </svg>
          </div>

          <div className="absolute bottom-8 flex flex-col justify-center items-center">
            <p className="text-my-yellow font-cyberpunk text-xs tracking-widest">
              - Scroll carefully, it's smooth -
              <br />小<span> · </span>心<span> · </span>地<span> · </span>滑
            </p>
          </div>
        </section>

        {/* title-ABOUT ME */}
        <section className="relative w-full flex items-center justify-center">
          <div className="relative flex-col items-start mb-24">
            <p
              className="font-impact text-[10rem] tracking-wider z-10 whitespace-nowrap text-purple-500
                        before:content-['ABOUT_ME'] before:absolute before:z-[2] before:left-1 before:top-1 before:text-cyan-400 
                        after:content-['ABOUT_ME'] after:absolute after:z-[3] after:left-2 after:top-2 after:text-purple-500"
            >
              ABOUT ME
            </p>
            <p className="font-impact mt-1 text-white tracking-wider">
              Hello, this is Kylan, a human being
              <br />
              Always thirst for knowledge :)
            </p>
          </div>
        </section>

        {/* 示例 About:Portrait */}
        <section ref={sectionRef} className="relative h-screen w-full flex items-center justify-center">
          <div className="rounded-3xl relative h-2/3 w-2/3">
            <img
              src="/assets/photos/portrait.png"
              alt="portrait加载失败"
              className="absolute h-full w-full object-contain object-top "
            />
            {/* X-ray 效果层，使用 clip-path 创建扫描效果 */}
            <motion.img
              src="/assets/photos/X-ray-portrait.png"
              alt="X-ray portrait加载失败"
              className="absolute h-full w-full object-contain object-top rounded-[5rem] bg-white bg-opacity-70"
              style={{ clipPath }} // 仅上方向下揭示
            />
            <motion.div
              className="absolute h-full w-full object-contain object-top bg-my-green bg-opacity-0"
              style={{ clipPath }}
            ></motion.div>

            {/* 扫描线 */}
            <motion.div
              className="absolute left-1/2 w-screen -translate-x-1/2 h-0.5 bg-my-green bg-opacity-50"
              style={{
                top: scanLineY,
                opacity: scanLineOpacity,
                filter: "drop-shadow(0px 0px 10px #17f700) drop-shadow(0px 0px 20px #17f700)",
              }}
            />
          </div>
        </section>

        {/* 技术栈 */}
        <section ref={techStackRef} className=" relative h-screen w-full flex items-center justify-center">
          <div className="absolute bottom-0 w-full h-full bg-my-green "></div>
          <div className="absolute top-24 left-20 text-white font-cyberpunk text-5xl z-10">My TechStack</div>
          <motion.div style={{ top: topY }} className="absolute h-full w-full rounded-b-full overflow-hidden z-5">
            <TechStackMagnetic></TechStackMagnetic>
          </motion.div>
        </section>

        {/* 项目经历-横向滚动 */}
        <section
          ref={horizontalRef}
          className="bg-my-green h-screen w-full flex items-center justify-start overflow-hidden"
        >
          <div className="flex items-center justify-start h-full flex-shrink-0">
            {/* Card 1 */}
            <ProjectCard
              projectNumber={1}
              images={[
                "/assets/photos/project1.png",
                "/assets/photos/project1-2.png",
                "/assets/photos/project1-3.png",
                "/assets/photos/project1-4.png",
              ]}
              title="个人网站"
              dateRange="2025.3-2025.4"
              projectDescription="本项目是基于Web的在线教育系统，旨在为学生和教师提供高效的学习和教学工具。平台支持课程管理、资源管理、作业提交与批改、实时互动等功能"
              techStack="前端为Vue3+elementplus+axios，后端使用Springboot框架"
              responsibilities="负责前端和前后端连接及测试"
              imageAlt="Project 1 Images"
            />
            <ProjectCard
              projectNumber={2}
              images={[
                "/assets/photos/project1.png",
                "/assets/photos/project1-2.png",
                "/assets/photos/project1-3.png",
                "/assets/photos/project1-4.png",
              ]}
              title="智慧课程平台"
              dateRange="2024.10-2024.11"
              projectDescription="本项目是基于Web的在线教育系统，旨在为学生和教师提供高效的学习和教学工具。平台支持课程管理、资源管理、作业提交与批改、实时互动等功能"
              techStack="前端为Vue3+elementplus+axios，后端使用Springboot框架"
              responsibilities="负责前端和前后端连接及测试"
              imageAlt="Project 2 Images"
            />
            <ProjectCard
              projectNumber={3}
              images={[
                "/assets/photos/project1.png",
                "/assets/photos/project1-2.png",
                "/assets/photos/project1-3.png",
                "/assets/photos/project1-4.png",
              ]}
              title="高铁站台监控系统"
              dateRange="2024.07-2024.08"
              projectDescription="本项目旨在通过人脸识别、智能分析算法等技术手段，提高高铁站台安全性。"
              techStack="前端基于 Vue3 技术栈开发，使用 Pinia 实现全局状态管理，采用 ElementPlus 组件库搭建响应式界面，后端使用Springboot和Flask框架，核心功能利用OpenCV、YOLOv5、PyTorch等技术实现。"
              responsibilities="负责前端开发、后端开发、前后端及测试。"
              imageAlt="Project 3 Images"
            />
            <ProjectCard
              projectNumber={4}
              images={[
                "/assets/photos/project1.png",
                "/assets/photos/project1-2.png",
                "/assets/photos/project1-3.png",
                "/assets/photos/project1-4.png",
              ]}
              title="外卖订单管理系统"
              dateRange="2024.07-2024.08"
              projectDescription="本项目旨在通过集中管理订单信息，提升外卖商家运营效率，从而减少人工操作和订单处理时间"
              techStack="前端使用Vue3+elementplus+axios，后端使用Springboot框架"
              responsibilities="负责前端开发、前后端及测试。"
              imageAlt="Project 4 Images"
            />
          </div>
          <div ref={basketballRef} className="absolute left-0 bottom-0">
            <img style={{ width: "6vw" }} src="/assets/stuff/basketball.png" alt="" />
          </div>
        </section>

        {/* When I'm Not Coding */}
        <section ref={cardContainerRef} className="relative w-full h-screen flex items-center justify-center gap-4">
          {/* title */}
          <div className="absolute left-20 top-16 text-white font-cyberpunk text-6xl z-10">When I'm Not Coding</div>
          {/* left container */}
          <motion.div
            style={{ opacity, y }}
            className="mt-32 bg-slate-500 rounded-3xl w-[40%] h-[70%] flex flex-col justify-center"
          >
            <p className="ml-24 text-white font-cyberpunk text-6xl">GAME</p>
            <Card
              imageUrl="/assets/photos/cs2.jpg"
              width="w-3/4"
              height="h-1/2"
              title="CS2"
              content="This is the description content for the first card."
              overlayColor="bg-blue-500"
            />
            <Card
              imageUrl="/assets/photos/lol_liqin.png"
              width="w-3/4"
              height="h-1/2"
              title="League of legend"
              content="This is another description for the second card."
              overlayColor="bg-red-500"
            />
          </motion.div>
          {/* right container */}
          <motion.div style={{ opacity, y }} className="mt-32 bg-slate-500 rounded-3xl w-[50%] h-[70%] flex">
            <div className="flex flex-col items-center justify-center">
              <p className="text-white font-cyberpunk text-6xl">BASKETBALL</p>
              <Card
                imageUrl="/assets/photos/curry1.jpg"
                width="w-[90%]"
                height="h-[90%]"
                title="League of legend"
                content="This is another description for the second card."
                overlayColor="bg-red-500"
              />
            </div>
            <div className="flex-col">
              <Card
                imageUrl="/assets/photos/curry2.jpg"
                width="w-[90%]"
                height="h-[40%]"
                title="League of legend"
                content="This is another description for the second card."
                overlayColor="bg-red-500"
              />
              <Card
                imageUrl="/assets/photos/curry3.jpg"
                width="w-[95%]"
                height="h-1/2"
                title="League of legend"
                content="This is another description for the second card."
                overlayColor="bg-red-500"
              />
            </div>
          </motion.div>
        </section>

        {/* PokerDeck */}
        <section className=" relative z-0 w-full h-screen">
          <div
            className="absolute left-1/2 top-8 -translate-x-1/2 text-opacity-0 font-cyberpunk tracking-widest text-[12rem] h-[20%]"
            style={{ WebkitTextStroke: "3px #ffffff" }}
          >
            RECORD
          </div>
          <div className="absolute bottom-24 w-full h-1/2">
            <PokerDeck />
          </div>
        </section>

        <section className="border-2 border-my-green relative z-10  flex justify-center items-center">
          {/* <FaultText /> */}
          <div className="border absolute top-1/2 -translate-y-full left-1/2 -translate-x-1/2 font-impact text-[10rem] ">
            <p className="text-nowrap select-none">CONTACT ME</p>
          </div>
          <div className="border absolute bottom-[40%] w-1/4">
            <hr />
            <div className="iconContainer select-none h-16 flex items-center justify-around gap-2">
              <div className="border">
                <img className="w-8" src="/assets/icons/mail.svg" alt="" />
                
              </div>
              <div>
                <img className="w-8" src="/assets/icons/Wechat.svg" alt="" />
                
              </div>
              <div>
                <img className="w-8" src="/assets/icons/github.svg" alt="" />
                
              </div>
            </div>
          </div>
          <div className="border-2 border-black w-full h-screen">
            <BouncingSquares />
          </div>
        </section>
      </div>
    </ReactLenis>
  );
};

export default HomePage;
