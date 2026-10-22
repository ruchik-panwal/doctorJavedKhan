"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function useMarqueeAnimation(direction) {
  const trackRef = useRef(null);

  useGSAP(
    () => {
      if (!trackRef.current) return;

      gsap.fromTo(
        trackRef.current,
        { xPercent: direction === "left" ? 0 : -50 },
        {
          xPercent: direction === "left" ? -50 : 0,
          duration: 15,
          ease: "none",
          repeat: -1,
        },
      );
    },
    { scope: trackRef, dependencies: [direction] }
  );

  return trackRef;
}