import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// 1. Your existing Hero Animations
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
      { clipPath: "inset(0% 0% 100% 0%)" }, 
      { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.out" }
    )
    .fromTo(amberDivRef.current, 
      { clipPath: "inset(0% 0% 100% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", ease: "power2.out" }, 
      "<0.2"
    );

  }, { scope: sectionRef });
};

// 2. The New Swiper Animation Hook
export const useSwiperAnimation = (wrapperRef, currentX, targetX) => {
  useGSAP(() => {
    if (!wrapperRef.current) return;

    const updateSmoothDrag = () => {
      // Lerp formula: smoothly ease 'currentX' closer to 'targetX'
      currentX.current += (targetX.current - currentX.current) * 0.1;
      
      gsap.set(wrapperRef.current, { x: currentX.current });
    };

    gsap.ticker.add(updateSmoothDrag);
    
    // Cleanup on unmount
    return () => gsap.ticker.remove(updateSmoothDrag);
  });
};