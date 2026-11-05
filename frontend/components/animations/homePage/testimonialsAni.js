"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function testimonialsAni(direction) {
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const firstSet = track?.querySelector("[data-marquee-set]");
      if (!track || !firstSet) return;

      let tween;

      const animate = () => {
        const setWidth = firstSet.getBoundingClientRect().width;
        if (!setWidth) return;

        if (tween) tween.kill();
        
        gsap.set(track, { x: direction === "right" ? -setWidth : 0 });
        
        tween = gsap.to(track, {
          x: direction === "left" ? -setWidth : 0,
          duration: setWidth / 80,
          ease: "none",
          repeat: -1,
        });
      };

      animate();
      
      const resizeObserver = new ResizeObserver(animate);
      resizeObserver.observe(firstSet);

      return () => {
        resizeObserver.disconnect();
        if (tween) tween.kill();
      };
    },
    { dependencies: [direction] }
  );

  return trackRef;
}