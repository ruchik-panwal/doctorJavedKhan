"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger so GSAP knows how to use it
gsap.registerPlugin(ScrollTrigger);

/**
 * 1. Hero Scroll Animations
 * Handles pinning the hero section and sliding/clipping the images into view.
 */
export const useHeroAnimations = (sectionRef, aboutRef, blueDivRef, amberDivRef) => {
  useGSAP(() => {
    if (!sectionRef.current || !aboutRef.current || !blueDivRef.current || !amberDivRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%",
        scrub: true,
        pin: true,
      },
    });

    tl.fromTo(
      aboutRef.current,
      { yPercent: 100 },
      { yPercent: 0, ease: "none" }
    )
    .fromTo(blueDivRef.current, 
      // rotation: 0.01 forces Firefox to anti-alias the clip-path smoothly 
      // without relying on buggy transform-gpu rendering
      { clipPath: "inset(0% 0% 100% 0%)", rotation: 0.01 }, 
      { clipPath: "inset(0% 0% 0% 0%)", rotation: 0, ease: "power2.out" }
    )
    .fromTo(amberDivRef.current, 
      { clipPath: "inset(0% 0% 100% 0%)", rotation: 0.01 },
      { clipPath: "inset(0% 0% 0% 0%)", rotation: 0, ease: "power2.out" }, 
      "<0.2" // Starts slightly before the previous animation finishes
    );

  }, { scope: sectionRef });
};

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