"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function useTextRolloverAni() {
  const { contextSafe } = useGSAP();

  const inAnimation = contextSafe((e) => {
    const q = gsap.utils.selector(e.currentTarget);
    const origText = q(".orig-text");
    const dupText = q(".duplicate-text");

    const tl = gsap.timeline({ overwrite: "auto" });

    tl.to(origText, {
      yPercent: -100,
      duration: 0.4,
      ease: "power2.inOut",
    }, 0)
    .fromTo(dupText, {
      yPercent: 100,
    }, {
      yPercent: 0,
      duration: 0.4,
      ease: "power2.inOut",
    }, 0);
  });

  const outAnimation = contextSafe((e) => {
    const q = gsap.utils.selector(e.currentTarget);
    const origText = q(".orig-text");
    const dupText = q(".duplicate-text");

    const tl = gsap.timeline({ overwrite: "auto" });

    tl.to(origText, {
      yPercent: 0,
      duration: 0.2,
      ease: "power2.out",
    }, 0)
    .to(dupText, {
      yPercent: 100,
      duration: 0.2,
      ease: "power2.out",
    }, 0);
  });

  return { inAnimation, outAnimation };
}