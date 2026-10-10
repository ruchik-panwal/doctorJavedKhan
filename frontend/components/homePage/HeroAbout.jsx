import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroAbout() {
  const containerRef = useRef(null);
  const blueDivRef = useRef(null);
  const amberDivRef = useRef(null);

  useGSAP(() => {
    // Animation for the Blue Div
    gsap.from(blueDivRef.current, {
      scaleY: 0, // Animate scale instead of height
      transformOrigin: "top", // Force it to scale down from the top edge
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 20%", 
        toggleActions: "play none none reverse", 
      },
    });

    // Animation for the Amber Div
    gsap.from(amberDivRef.current, {
      scaleY: 0, // Animate scale instead of height
      transformOrigin: "top", // Force it to scale down from the top edge
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 10%", 
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="hero-about absolute top-0 left-0 flex justify-between items-center h-screen w-screen bg-background"
    >
      <div className="flex flex-col gap-20 tenorClass text-7xl h-full w-full p-20">
        <div>About Me</div>
        <div ref={blueDivRef} className="bg-blue-600 h-200 w-150"></div>
      </div>
      
      <div className=" flex flex-col gap-40 h-full w-full">
        <div className=" mt-20 h-60 w-200 flex">
          <div className="p-1 font-stack text-[0.8rem] w-120 font-extralight">
            OVERVIEW
          </div>
          <div className="tenorClass text-3xl text-black/70">
            For over half a century, HBA has been a leading voice in the world
            of hospitality and design. Today, we are a dynamic and
            multidisciplinary creative collective, bringing decades of
            experience to bear across specialisms, markets and industries.
          </div>
        </div>
        <div ref={amberDivRef} className="bg-amber-400 mt-20 h-120 w-200"></div>
      </div>
    </div>
  );
}