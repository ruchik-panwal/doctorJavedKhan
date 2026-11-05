import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const setupStatsReveal = (containerEl, rowEls) => {
  const rows = rowEls.filter(Boolean);
  if (!rows.length || !containerEl) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) {
    gsap.set(rows, { opacity: 1, filter: "blur(0px)", y: 0 });
    return;
  }

  // Initial state: hidden and blurred
  gsap.set(rows, {
    opacity: 0,
    filter: "blur(14px)",
    y: 16, // subtle upward drift accompanying the blur
  });

  // ScrollTrigger: fires once and never repeats on scroll up/down
  ScrollTrigger.create({
    trigger: containerEl,
    start: "top 75%",
    once: true,
    onEnter: () => {
      gsap.to(rows, {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 1, // 1 second fade/blur per level
        stagger: 0.4, // level-by-level reveal
        ease: "power2.out",
      });
    },
  });
};