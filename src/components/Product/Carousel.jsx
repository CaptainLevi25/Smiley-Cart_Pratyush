import React, { useEffect, useRef } from "react";

import { Left, Right } from "neetoicons";

import { Button } from "neetoui";
import { useState } from "react";
const Carousel = ({ imageUrls }) => {
  const timerRef = useRef(null);
  console.log(imageUrls);
  const [currentIndex, setCurrentIndex] = useState(0);
  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(handleNext, 3000);
  };
  const handleNext = () =>
    setCurrentIndex(prevIndex => (prevIndex + 1) % imageUrls.length);

  const handlePrevious = () =>
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + imageUrls.length) % imageUrls.length
    );
    useEffect(() => {
      timerRef.current = setInterval(handleNext, 3000);

      return () => clearInterval(timerRef.current);
    }, []);
  return (
    <div className="flex flex-col items-center">
      <img
        className="max-w-56 h-56 max-h-56 w-56"
        src={imageUrls[currentIndex]}
      />

      <div className="flex space-x-1">
        {imageUrls.map((_, index) => {
          const defaultClasses =
            "neeto-ui-border-black neeto-ui-rounded-full h-3 w-3 cursor-pointer border";

          const dotClassNames =
            index === currentIndex
              ? defaultClasses.concat(" neeto-ui-bg-black")
              : defaultClasses;
          return (
            <span
              className={dotClassNames}
              key={index}
              onClick={() => setCurrentIndex(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
