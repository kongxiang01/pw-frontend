import React, { useState } from "react";

const Pokers = () => {
  const transformDatas = [
    "rotate(-10deg)",
    "rotate(-6deg) translate(35%, -12%)",
    "rotate(-2deg) translate(65%, -19%)",
    "rotate(2deg) translate(95%, -26%)",
    "rotate(6deg) translate(125%, -23%)",
  ];

  // 设置初始卡片的 style 属性，包括 transform 和 zIndex
  const initialCards = [
    { id: 0, src: "/assets/photos/photo (4).webp", num: 0, style: { transform: transformDatas[0], zIndex: 0 } },
    { id: 1, src: "/assets/photos/photo (3).webp", num: 1, style: { transform: transformDatas[1], zIndex: 1 } },
    { id: 2, src: "/assets/photos/photo (2).webp", num: 2, style: { transform: transformDatas[2], zIndex: 2 } },
    { id: 3, src: "/assets/photos/photo (1).webp", num: 3, style: { transform: transformDatas[3], zIndex: 3 } },
    { id: 4, src: "/assets/photos/photo (0).webp", num: 4, style: { transform: transformDatas[4], zIndex: 4 } },
  ];

  const [cards, setCards] = useState(initialCards);
  const [imgIndex, setImgIndex] = useState(5); // 从第5张图片开始
  const imgs = Array.from({ length: 9 }, (_, i) => ({
    src: `/assets/photos/photo (${i}).webp`,
  }));

  const move = () => {
    let nextImgIndex = imgIndex; // 暂存 imgIndex
    const newCards = cards.map((card) => {
      let newNum = card.num + 1;
      let transition = "transform 0.3s ease";
      let newSrc = card.src;

      if (newNum >= cards.length) {
        newNum = 0;
        transition = ""; // 移到最后一张卡片时无过渡效果
        newSrc = imgs[nextImgIndex].src;
        nextImgIndex = (nextImgIndex + 1) % imgs.length; // 更新 nextImgIndex
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

    setCards(newCards); // 更新卡片状态
    setImgIndex(nextImgIndex); // 在 map 外部更新 imgIndex
  };

  return (
      <div className=" flex justify-center items-center w-full h-full">
        <div className="absolute w-[45rem] h-[25rem]">
          {cards.map((card) => (
            <div
              key={card.id}
              className="absolute w-[20rem] h-[26rem] border-[0.15rem] border-red rounded-[1.5rem] bg-[#17f700] origin-bottom-left overflow-hidden select-none"
              style={card.style}
            >
              <img src={card.src} alt={`poker-${card.id}`} className="relative w-full" />
            </div>
          ))}
          <div
            className="absolute w-[20rem] h-[26rem] border-[0.15rem] border-white rounded-[1.5rem] bg-white origin-bottom-left overflow-hidden select-none transition duration-300 ease-in-out cursor-pointer z-10 hover:bg-[#aaa]"
            style={{ transform: transformDatas[4], zIndex: 1000 }}
            onClick={move}
          ></div>
        </div>
      </div>
  );
};

export default Pokers;