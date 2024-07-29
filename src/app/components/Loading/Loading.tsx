import React, { useEffect, useRef } from "react";
import anime from "animejs";
import cx from "classnames";
import { LoaderProps } from "@/types/component";

const Loader = ({ className }: LoaderProps) => {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loaderRef.current) {
      anime({
        targets: loaderRef.current.children,
        keyframes: [{ translateY: -10 }, { translateY: 10 }],
        duration: 1000,
        loop: true,
        easing: "easeInOutQuad",
        delay: anime.stagger(100, { start: 0 }),
      });
    }
  }, []);

  return (
    <div
      className={cx(
        "flex flex-col items-center space-y-2 h-[50vh] justify-center",
        className
      )}
    >
      <div ref={loaderRef} className="flex space-x-2 gap-2">
        <div className="w-4 h-4 bg-blue-500 rounded-full" />
        <div className="w-4 h-4 bg-blue-500 rounded-full" />
        <div className="w-4 h-4 bg-blue-500 rounded-full" />
        <div className="w-4 h-4 bg-blue-500 rounded-full" />
        <div className="text-blue-500 text-xl font-semibold ">L</div>
        <div className="text-blue-500 text-xl font-semibold ">o</div>
        <div className="text-blue-500 text-xl font-semibold ">a</div>
        <div className="text-blue-500 text-xl font-semibold ">d</div>
        <div className="text-blue-500 text-xl font-semibold ">i</div>
        <div className="text-blue-500 text-xl font-semibold ">n</div>
        <div className="text-blue-500 text-xl font-semibold ">g</div>
      </div>
    </div>
  );
};

export default Loader;
