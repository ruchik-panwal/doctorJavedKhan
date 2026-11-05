"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // GSAP Animation effect triggered when isVisible changes
  useEffect(() => {
    if (isVisible) {
      // Animate in: slide up and fade in
      gsap.to(buttonRef.current, {
        y: 0,
        opacity: 1,
        pointerEvents: "auto",
        duration: 0.5,
        ease: "back.out(1.5)", // Adds a slight bouncy pop
        overwrite: "auto",
      });
    } else {
      // Animate out: slide down and fade out
      gsap.to(buttonRef.current, {
        y: 50,
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
        ease: "power2.in",
        overwrite: "auto",
      });
    }
  }, [isVisible]);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleScrollToTop}
      // Initialize hidden and pushed down 50px
      style={{ opacity: 0, transform: "translateY(50px)", pointerEvents: "none" }}
      className="fixed bottom-8 stackClass border border-black left-8 z-50 px-5 py-1 rounded-full flex items-center gap-1 cursor-pointer"
    >
      Top
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M13 20h-2V8l-5.5 5.5-1.42-1.42L12 4.16l7.92 7.92-1.42 1.42L13 8v12z" />
      </svg>
    </button>
  );
}