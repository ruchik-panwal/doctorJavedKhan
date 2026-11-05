import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useMagneticHover() {
  const wrapperRef = useRef(null);
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const outer = outerRef.current;
    const inner = innerRef.current;

    if (!wrapper || !outer || !inner) return;

    const handleMouseMove = (e) => {
      const rect = wrapper.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      const distance = Math.sqrt(distX * distX + distY * distY);

      const proximityRadius = 120;

      if (distance < proximityRadius) {
        const innerMoveX = (distX / proximityRadius) * 20;
        const innerMoveY = (distY / proximityRadius) * 20;
        
        const outerMoveX = (distX / proximityRadius) * 6;
        const outerMoveY = (distY / proximityRadius) * 6;

        gsap.to(inner, {
          x: innerMoveX,
          y: innerMoveY,
          duration: 0.15, 
          ease: "power3.out",
          overwrite: "auto",
        });

        gsap.to(outer, {
          x: outerMoveX,
          y: outerMoveY,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else {
        gsap.to([inner, outer], {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.4)", 
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Return the refs so the component can attach them to its divs
  return { wrapperRef, outerRef, innerRef };
}