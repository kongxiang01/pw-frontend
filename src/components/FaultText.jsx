import React, { useState, useEffect } from 'react';

const FaultText = () => {
  const [isFaulting, setIsFaulting] = useState(false);
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    const initialTexts = Array.from({ length: 4 }, () => ({
      transform: '',
      clipPath: '',
    }));
    setTexts(initialTexts);
  }, []);

  const fault = () => {
    setTimeout(() => {
      clearInterval(interval);
      setIsFaulting(false);
      setTexts((prevTexts) =>
        prevTexts.map(() => ({
          transform: '',
          clipPath: '',
        }))
      );
    }, 1000);

    setIsFaulting(true);
    const interval = setInterval(() => {
      setTexts((prevTexts) =>
        prevTexts.map(() => {
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const w = Math.random() * 40 + 10;
          const h = Math.random() * 50 + 50;
          return {
            transform: `translate(${Math.random() * 60 - 30}%, ${Math.random() * 60 - 30}%)`,
            clipPath: `polygon(${x}% ${y}%, ${x + w}% ${y}%, ${x + w}% ${y + h}%, ${x}% ${y + h}%)`,
          };
        })
      );
    }, 30);
  };

  return (
    <div className="flex justify-center items-center w-full h-screen overflow-hidden">
      <div className="flex justify-center items-center cursor-pointer" onClick={fault}>
        {texts.map((text, index) => (
          <p
            key={index}
            className={`absolute font-[Impact] text-[5.5rem] text-zinc-500 tracking-[0.5rem] select-none  ${
              isFaulting
                ? 'after:content-["CONTEXT"] after:absolute after:left-0 after:top-0 after:mix-blend-screen after:text-red-500 after:translate-x-[2%] before:content-["CONTEXT"] before:absolute before:left-0 before:top-0 before:mix-blend-screen before:text-blue-500 before:-translate-x-[2%]'
                : ''
            }`}
            style={{
              transform: text.transform,
              clipPath: text.clipPath,
            }}
          >
            CONTEXT
          </p>
        ))}
      </div>
    </div>
  );
};

export default FaultText;