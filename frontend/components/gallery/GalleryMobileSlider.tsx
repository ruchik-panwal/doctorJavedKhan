"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

const IMAGES = [
  "/galleryImages/image1.jpg",
  "/galleryImages/image2.jpg",
  "/galleryImages/image3.jpg",
  "/galleryImages/image4.jpg",
  "/galleryImages/image5.jpg",
];

const TITLES = [
  "SAPPHIRE",
  "THOUGHTFUL SPACES",
  "PRECISION TECH",
  "EXPERT CARE",
  "PATIENT JOURNEY",
];

const TOTAL = IMAGES.length;
const INTERVAL_MS = 3000;

const GalleryMobileSlider = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(index);
    setTimeout(() => setAnimating(false), 600);
  }, [animating]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % TOTAL);
  }, []);

  // Auto-advance every 3 seconds
  useEffect(() => {
    intervalRef.current = setInterval(next, INTERVAL_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next]);

  // Reset timer on manual tap
  const handleDotClick = (i: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    goTo(i);
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % TOTAL);
    }, INTERVAL_MS);
  };

  return (
    <section
      id="gallery-content"
      className="w-full flex flex-col scroll-mt-16"
    >
      {/* Slide counter + title */}
      <div className="px-5 pt-8 pb-4 flex flex-col items-center text-center gap-2">
        <span className="stackClass text-[0.7rem] tracking-[0.18em] uppercase text-[#0b1b3a]/50">
          {current + 1} / {TOTAL}
        </span>
        <h2 className="tenorClass text-[clamp(1.6rem,8vw,2.4rem)] font-normal text-[#0b1b3a] leading-tight tracking-tight">
          {TITLES[current]}
        </h2>
      </div>

      {/* Image container — full-width, 70svh tall */}
      <div className="relative w-full" style={{ height: "70svh" }}>
        {IMAGES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-[600ms] ease-in-out"
            style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? "auto" : "none" }}
            aria-hidden={i !== current}
          >
            <Image
              src={src}
              alt={`Gallery image ${i + 1} — ${TITLES[i]}`}
              fill
              sizes="100vw"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/20">
          <div
            key={current}
            className="h-full bg-white origin-left"
            style={{
              animation: `slideProgress ${INTERVAL_MS}ms linear forwards`,
            }}
          />
        </div>
      </div>

      {/* Dot navigation */}
      <div className="flex items-center justify-center gap-2 pt-5 pb-10">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 h-[6px] bg-[#0b1b3a]"
                : "w-[6px] h-[6px] bg-[#0b1b3a]/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default GalleryMobileSlider;
