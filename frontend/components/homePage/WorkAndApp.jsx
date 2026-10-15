"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useSwiperAnimation } from "./HomeAni";
import { animateSwiperCard, resetSwiperCursor } from "../animations/cursorAni";
import SwiperCard from "./SwiperCard";

export default function WorkAndApp() {
  return (
    <div className="flex flex-col h-screen w-screen">
      <div className="tenorClass p-20 text-8xl">
        Featured Work & Appearances
      </div>
      <Swiper />
    </div>
  );
}

function Swiper() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  const customCursorRef = useRef(null);
  const cursorTextRef = useRef(null);
  
  // Refs for optimized GSAP quickTo functions
  const xTo = useRef(null);
  const yTo = useRef(null);

  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const startMouseX = useRef(0);

  const startX = useRef(0);
  const currentX = useRef(0);
  const targetX = useRef(0);

  useSwiperAnimation(wrapperRef, currentX, targetX);

  useEffect(() => {
    // Center the custom cursor by default so we don't have to animate xPercent/yPercent on every frame
    gsap.set(customCursorRef.current, { xPercent: -50, yPercent: -50 });

    // Initialize highly optimized mouse tracking functions
    xTo.current = gsap.quickTo(customCursorRef.current, "x", { duration: 0.25, ease: "power3.out" });
    yTo.current = gsap.quickTo(customCursorRef.current, "y", { duration: 0.25, ease: "power3.out" });
  }, []);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    hasDragged.current = false;
    startMouseX.current = e.pageX;
    startX.current = e.pageX - targetX.current;
  };

  const handleSwiperEnter = () => {
    if (customCursorRef.current && cursorTextRef.current) {
      animateSwiperCard(customCursorRef.current, cursorTextRef.current);
    }
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    if (customCursorRef.current && cursorTextRef.current) {
      resetSwiperCursor(customCursorRef.current, cursorTextRef.current);
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e) => {
    // 1. Performant cursor tracking using quickTo
    if (containerRef.current && xTo.current && yTo.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      xTo.current(x);
      yTo.current(y);
    }

    // 2. Handle dragging logic
    if (!isDragging.current) return;
    if (Math.abs(e.pageX - startMouseX.current) > 5) {
      hasDragged.current = true;
    }

    e.preventDefault();
    const x = e.pageX - startX.current;
    const maxScroll = -(
      wrapperRef.current.scrollWidth - containerRef.current.offsetWidth
    );
    targetX.current = Math.max(maxScroll, Math.min(x, 0));
  };

  const swiperData = [
    { id: 1, url: "https://google.com" },
    { id: 2, url: "https://github.com" },
    { id: 3, url: "https://twitter.com" },
    { id: 4, url: "https://dribbble.com" },
    { id: 5, url: "https://awwwards.com" },
  ];

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseEnter={handleSwiperEnter}
      onMouseLeave={handleMouseLeave} // Separated leave
      onMouseUp={handleMouseUp}       // Separated mouse up so cursor stays visible while dragging
      onMouseMove={handleMouseMove}
      className="relative w-full h-7/10 overflow-hidden px-4 select-none cursor-none"
    >
      <div
        ref={customCursorRef}
        className="absolute top-0 left-0 z-50 flex items-center justify-center rounded-full pointer-events-none"
        style={{ width: 0, height: 0, opacity: 0 }}
      >
        <span
          ref={cursorTextRef}
          className="text-3xl stackClass opacity-0"
        ></span>
      </div>

      <div ref={wrapperRef} className="flex gap-4 h-9/10 w-max">
        {swiperData.map((item) => {
          return (
            <SwiperCard
              key={item.id}
              url={item.url}
              hasDragged={hasDragged}
            />
          );
        })}
      </div>
    </div>
  );
}