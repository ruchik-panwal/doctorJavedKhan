"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// --- GSAP Animation Helpers ---

export const animateSwiperCard = (cursor, text) => {
  text.textContent = "DRAG";
  
  gsap.to(cursor, {
    width: "auto",
    height: "auto",
    backgroundColor: "transparent",
    opacity: 1,
    scale: 1,
    mixBlendMode: "difference",
    duration: 0.4,
    ease: "power2.out",
    overwrite: "auto",
  });
  
  gsap.to(text, { color: "white", opacity: 1, duration: 0.3, delay: 0.1, overwrite: "auto" });
};

export const resetSwiperCursor = (cursor, text) => {
  gsap.to(cursor, {
    opacity: 0,
    scale: 0.5,
    duration: 0.4,
    ease: "power2.out",
    overwrite: "auto",
  });
  
  gsap.to(text, { opacity: 0, duration: 0.2, overwrite: "auto" });
};

// --- Custom Hooks ---

export const useSwiperAnimation = (wrapperRef, currentX, targetX) => {
  useGSAP(() => {
    if (!wrapperRef.current) return;

    const updateSmoothDrag = () => {
      currentX.current += (targetX.current - currentX.current) * 0.1;
      gsap.set(wrapperRef.current, { x: currentX.current });
    };

    gsap.ticker.add(updateSmoothDrag);
    
    return () => gsap.ticker.remove(updateSmoothDrag);
  });
};

// --- Components ---

function SwiperCard({ url, hasDragged, onCardEnter, onCardLeave }) {
  const gradientRef = useRef(null);
  const textRef = useRef(null);
  const iconRef = useRef(null);

  const handleClick = (e) => {
    if (hasDragged.current) {
      e.preventDefault();
      return;
    }

    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleMouseEnter = () => {
    if (onCardEnter) onCardEnter();

    gsap.to(gradientRef.current, {
      scaleY: 1.5,
      duration: 1,
      ease: "power.out",
    });
    gsap.to(textRef.current, {
      scale: 1.5,
      transformOrigin: "left bottom",
      duration: 0.7,
      ease: "power.out",
    });
    gsap.to(iconRef.current, { y: 0, duration: 1, ease: "power.out" });
  };

  const handleMouseLeave = () => {
    if (onCardLeave) onCardLeave();

    gsap.to(gradientRef.current, {
      scaleY: 1,
      duration: 1,
      ease: "power2.out",
    });
    gsap.to(textRef.current, { scale: 1, duration: 0.7, ease: "power2.out" });
    gsap.to(iconRef.current, { y: -100, duration: 1, ease: "power2.out" });
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden cursor-none shrink-0 h-full w-250 bg-cyan-700 rounded-2xl flex items-center justify-center text-white text-4xl"
    >
      <div
        ref={gradientRef}
        className="absolute inset-0 z-10 bg-linear-to-b from-transparent to-black/95 origin-bottom"
      ></div>

      <svg
        ref={iconRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="absolute top-8 right-8 z-30 w-12 h-12"
        style={{ transform: "translateY(-100px)" }}
      >
        <path d="M5 17.59L15.59 7H9V5h10v10h-2V8.41L6.41 19 5 17.59Z" />
      </svg>

      <div className="relative z-20 h-full w-full p-8 flex flex-col justify-end">
        <div className="flex justify-start items-center w-full">
          <p ref={textRef} className="stackClass text-5xl">
            NYU College Of Dentistry
          </p>
        </div>
      </div>

      <Image
        src="/testImages/img3.png"
        alt="About Image 2"
        fill
        className="object-cover z-0"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}

function Swiper() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  const customCursorRef = useRef(null);
  const cursorTextRef = useRef(null);
  
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
    gsap.set(customCursorRef.current, { xPercent: -50, yPercent: -50 });

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
    if (containerRef.current && xTo.current && yTo.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      xTo.current(x);
      yTo.current(y);
    }

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
      onMouseLeave={handleMouseLeave} 
      onMouseUp={handleMouseUp}       
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