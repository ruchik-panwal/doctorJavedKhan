import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger once in this file
gsap.registerPlugin(ScrollTrigger);

export const useWorkAnimations = (containerRef) => {
  useGSAP(() => {
    // Animate columns 2 and 4 (even indices: 1, 3, 5...) moving up faster
    gsap.to(".col-even", {
      y: -250, 
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1, // Smooth scrubbing
      },
    });

    // Animate columns 1 and 3 (odd indices: 0, 2, 4...) moving slightly down/slower
    gsap.to(".col-odd", {
      y: 100,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, { scope: containerRef });
};