import React, { useState } from "react";
import { motion, AnimatePresence, delay } from "framer-motion";

const Pokers = () => {
  const transformDatas = [
    "rotate(-10deg)",
    "rotate(-6deg) translate(35%, -12%)",
    "rotate(-2deg) translate(65%, -19%)",
    "rotate(2deg) translate(95%, -26%)",
    "rotate(6deg) translate(125%, -23%)",
  ];

  const initialCards = [
    { id: 0, src: "/assets/photos/photo (4).jpg", num: 0, style: { transform: transformDatas[0], zIndex: 0 } },
    { id: 1, src: "/assets/photos/photo (3).jpg", num: 1, style: { transform: transformDatas[1], zIndex: 1 } },
    { id: 2, src: "/assets/photos/photo (2).jpg", num: 2, style: { transform: transformDatas[2], zIndex: 2 } },
    { id: 3, src: "/assets/photos/photo (1).jpg", num: 3, style: { transform: transformDatas[3], zIndex: 3 } },
    { id: 4, src: "/assets/photos/photo (0).jpg", num: 4, style: { transform: transformDatas[4], zIndex: 4 } },
  ];

  const [cards, setCards] = useState(initialCards);
  const [imgIndex, setImgIndex] = useState(5);
  const [selectedCard, setSelectedCard] = useState(null); // 跟踪选中的卡片
  const imgs = Array.from({ length: 13 }, (_, i) => ({
    src: `/assets/photos/photo (${i}).jpg`,
  }));

  const move = () => {
    let nextImgIndex = imgIndex;
    const newCards = cards.map((card) => {
      let newNum = card.num + 1;
      let transition = "transform 0.3s ease";
      let newSrc = card.src;

      if (newNum >= cards.length) {
        newNum = 0;
        transition = "";
        newSrc = imgs[nextImgIndex].src;
        nextImgIndex = (nextImgIndex + 1) % imgs.length;
      }

      return {
        ...card,
        num: newNum,
        src: newSrc,
        style: {
          zIndex: newNum,
          transform: transformDatas[newNum],
          transition: transition,
        },
      };
    });

    setCards(newCards);
    setImgIndex(nextImgIndex);
  };

  const handleCardClick = (card) => {
    setSelectedCard(selectedCard?.id === card.id ? null : card); // 点击已选中卡片时取消选中
  };

  const handleBackgroundClick = () => {
    setSelectedCard(null); // 点击背景关闭居中展示
  };

  // 定义signpost的动画变体
  const signpostVariants = {
    animate: {
      rotate: [1, 12, 8, 12, 1, 1, 1], // 从0度到12度再到-12度循环
      transition: {
        duration: 2, // 整个动画周期2秒
        repeat: Infinity, // 无限循环
        ease: "easeInOut", // 平滑过渡
      }
    },
    initial: {
      rotate: 2 // 初始状态0度
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full" onClick={handleBackgroundClick}>
      <div className="absolute w-[45rem] h-[25rem]">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className="absolute w-[20rem] h-[26rem] border-[0.15rem] border-red rounded-[1.5rem] bg-[#17f700] origin-bottom-left overflow-hidden select-none cursor-pointer"
            style={{ zIndex: card.style.zIndex }}
            animate={{ transform: card.style.transform }}
            whileHover={{ transform: `${card.style.transform} translateY(-16px)` }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={(e) => {
              e.stopPropagation(); // 阻止事件冒泡到背景
              handleCardClick(card);
            }}
          >
            <img src={card.src} alt={`poker-${card.id}`} className="relative w-full h-full object-cover" />
            
          </motion.div>
        ))}
        <motion.div
          className="absolute w-[20rem] h-[26rem] border-[0.15rem] border-white rounded-[1.5rem] bg-white origin-bottom-left overflow-hidden select-none transition duration-300 ease-in-out cursor-pointer z-10 hover:bg-[#aaa]"
          style={{ transform: transformDatas[4], zIndex: 10 }}
          onClick={(e) => {
            e.stopPropagation();
            move();
          }}
        >
          <motion.img
            src="/assets/stuff/signpost.png"
            alt="signpost"
            className="absolute bottom-0 w-full h-full object-cover"
            style={{ transformOrigin: "bottom center" }}
            variants={signpostVariants}
            initial="initial"
            whileHover="animate"
          />
        </motion.div>
      </div>

      {/* 居中展示选中的卡片 */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-50 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleBackgroundClick}
          >
            <motion.div
              className="w-[30rem] h-[39rem] border-[0.15rem] border-red rounded-[1.5rem] bg-[#17f700] overflow-hidden"
              initial={{ scale: 0, opacity: 0, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedCard.src} alt={`poker-${selectedCard.id}`} className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Pokers;