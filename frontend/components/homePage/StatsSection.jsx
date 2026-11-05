"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { setupStatsReveal } from "../animations/homePage/statAnimation";

const StatsSection = () => {
  const containerRef = useRef(null);
  const rowsRef = useRef([]);

  const stats = [
    { value: "300", label: "Happy patients" },
    { value: "70", label: "Reviews" },
    { value: "2", label: "Clinics" },
  ];

  useGSAP(
    () => {
      setupStatsReveal(containerRef.current, rowsRef.current);
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="h-[50vh] sm:h-[60vh] md:h-[90vh] w-full flex items-center justify-center p-4 sm:p-6 md:p-12 lg:p-15 tenorClass text-black"
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
            className="border-t border-black flex flex-row items-center justify-between py-4 sm:py-4 md:py-5 lg:py-6 px-2 sm:px-6 md:px-16 lg:px-24 gap-4"
          >
            {/* Number Section */}
            <div className="flex items-center justify-start">
              <span className="text-5xl sm:text-7xl md:text-9xl lg:text-[115px] leading-none tracking-tight">
                {stat.value}
              </span>
            </div>

            {/* Label Section */}
            <div className="w-24 sm:w-36 md:w-48 lg:w-56 text-right md:text-center shrink-0">
              <p className="text-sm sm:text-base md:text-2xl lg:text-3xl font-light tracking-tight">
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
