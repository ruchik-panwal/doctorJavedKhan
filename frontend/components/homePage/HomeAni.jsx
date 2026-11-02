"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger so GSAP knows how to use it
gsap.registerPlugin(ScrollTrigger);

// 1. Standalone About Section Animations — top-to-bottom wipe reveal (one-time)
export const useAboutAnimations = (aboutRef, blueDivRef, amberDivRef) => {
  useGSAP(() => {
    if (!aboutRef?.current || !blueDivRef?.current || !amberDivRef?.current) return;

    // inset(top right bottom left)
    // Start: bottom=100% → visible height is 0, anchored at top → image is hidden
    // End:   bottom=0%  → fully visible, wipe went top → bottom ✓
    gsap.set(blueDivRef.current,  { clipPath: "inset(0% 0% 100% 0%)" });
    gsap.set(amberDivRef.current, { clipPath: "inset(0% 0% 100% 0%)" });

    ScrollTrigger.create({
      trigger: aboutRef.current,
      // "top 60%" = section top enters at 60% from viewport top = 40% of section is visible
      start: "top 60%",
      once: true,   // fire once, never reset — images stay revealed after first play
      onEnter: () => {
        // javed2 — main portrait, reveals top → bottom in 1s
        gsap.to(blueDivRef.current, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 2.5,
          ease: "power2.out",
        });
        // javed3 — secondary image, slight stagger
        gsap.to(amberDivRef.current, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 2.5,
          ease: "power2.out",
          delay: 0.2,
        });
      },
    });

  }, { scope: aboutRef });
};

// Kept for backward compatibility
export const useHeroAnimations = () => {};

/**
 * 2. Swiper Drag Animation
 * Creates a buttery-smooth Lerp (Linear Interpolation) drag effect using GSAP's internal ticker.
 */
export const useSwiperAnimation = (wrapperRef, currentX, targetX) => {
  useGSAP(() => {
    if (!wrapperRef.current) return;

    const updateSmoothDrag = () => {
      // Lerp formula: smoothly ease 'currentX' closer to 'targetX' by 10% every frame
      currentX.current += (targetX.current - currentX.current) * 0.1;
      
      gsap.set(wrapperRef.current, { x: currentX.current });
    };

    // Add our function to GSAP's render loop (runs ~60 times per second)
    gsap.ticker.add(updateSmoothDrag);
    
    // Cleanup: Remove the ticker listener when the component unmounts
    return () => gsap.ticker.remove(updateSmoothDrag);
  });
};