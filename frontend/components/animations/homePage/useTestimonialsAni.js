"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const SPEED = 80; // pixels per second

export function useTestimonialsAni(direction) {
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

        // keep position on resize instead of restarting
        const progress = tween ? tween.progress() : 0;
        if (tween) tween.kill();

        const from = direction === "right" ? -setWidth : 0;
        const to = direction === "right" ? 0 : -setWidth;

        tween = gsap.fromTo(
          track,
          { x: from },
          { x: to, duration: setWidth / SPEED, ease: "none", repeat: -1 },
        );
        tween.progress(progress);
      };

      animate();

      const resizeObserver = new ResizeObserver(animate);
      resizeObserver.observe(firstSet);

      return () => {
        resizeObserver.disconnect();
        if (tween) tween.kill();
      };
    },
    { dependencies: [direction] },
  );

  return trackRef;
}