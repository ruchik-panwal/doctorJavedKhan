"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const StatsSection = () => {
  const containerRef = useRef(null);
  const rowsRef = useRef([]);

  const stats = [
    { value: "300", label: "Happy patients" },
    { value: "70", label: "Reviews" },
    { value: "2", label: "Clinic's" },
  ];

  useGSAP(
    () => {
      const rows = rowsRef.current.filter(Boolean);
      if (!rows.length) return;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reducedMotion) {
        gsap.set(rows, { opacity: 1, filter: "blur(0px)" });
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
        trigger: containerRef.current,
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
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="min-h-screen w-full flex items-center justify-center p-6 md:p-12 lg:p-20 tenorClass text-black"
    >
      {/* Container for the stats with a max-width */}
      <div className="w-full max-w-6xl border-b border-black">
        {/* Map through the stats array to generate rows */}
        {stats.map((stat, index) => (
          <div
            key={index}
            ref={(el) => (rowsRef.current[index] = el)}
            style={{
              opacity: 0,
              willChange: "filter, opacity, transform",
            }}
            className="border-t border-black flex flex-row items-center justify-between py-10 md:py-14 lg:py-16 px-6 md:px-16 lg:px-24"
          >
            {/* Number Section (Left side with inset) */}
            <div className="flex items-center justify-start">
              <span className="text-7xl md:text-9xl lg:text-[115px] leading-none tracking-tight">
                {stat.value}
              </span>
            </div>

            {/* Label Section (Right side) */}
            <div className="w-36 md:w-48 lg:w-56 text-center">
              <p className="text-base md:text-2xl lg:text-3xl font-light tracking-tight">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
