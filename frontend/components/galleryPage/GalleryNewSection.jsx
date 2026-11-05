"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useGalleryEntrance, useGalleryTransition } from "../animations/galleryPage/galleryAnimation"; // Adjust import path if needed

// ─── 5-Slide Data Sets with Gallery Images ─────────────────────────────────────
const SLIDES = [
  {
    id: 1,
    title: "SAPPHIRE",
    category: "01 / SAPPHIRE",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    images: {
      img1: "/galleryImages/image1.jpg",
      img2: "/galleryImages/image2.jpg",
      img3: "/galleryImages/image3.jpg",
      img4: "/galleryImages/image4.jpg",
      img5: "/galleryImages/image5.jpg",
    },
  },
  {
    id: 2,
    title: "SPACES",
    category: "02 / SPACES",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    images: {
      img1: "/galleryImages/image2.jpg",
      img2: "/galleryImages/image3.jpg",
      img3: "/galleryImages/image4.jpg",
      img4: "/galleryImages/image5.jpg",
      img5: "/galleryImages/image1.jpg",
    },
  },
  {
    id: 3,
    title: "SCAN",
    category: "03 / SCAN",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    images: {
      img1: "/galleryImages/image3.jpg",
      img2: "/galleryImages/image4.jpg",
      img3: "/galleryImages/image5.jpg",
      img4: "/galleryImages/image1.jpg",
      img5: "/galleryImages/image2.jpg",
    },
  },
  {
    id: 4,
    title: "TREATMENTS",
    category: "04 / TREATMENTS",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    images: {
      img1: "/galleryImages/image4.jpg",
      img2: "/galleryImages/image5.jpg",
      img3: "/galleryImages/image1.jpg",
      img4: "/galleryImages/image2.jpg",
      img5: "/galleryImages/image3.jpg",
    },
  },
  {
    id: 5,
    title: "SMILES",
    category: "05 / SMILES",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    images: {
      img1: "/galleryImages/image5.jpg",
      img2: "/galleryImages/image1.jpg",
      img3: "/galleryImages/image2.jpg",
      img4: "/galleryImages/image3.jpg",
      img5: "/galleryImages/image4.jpg",
    },
  },
];

const TOTAL = SLIDES.length;
const AUTO_ADVANCE_DELAY = 3000;

const GalleryImageSlot = ({
  currentSrc,
  incomingSrc,
  alt,
  sizes,
  priority,
  isHovered,
  activeIndex,
}) => (
  <div className="relative w-full h-full overflow-hidden">
    <div
      key={activeIndex}
      className="gallery-slide-curr z-0 absolute inset-0 w-full h-full will-change-transform"
    >
      <Image
        src={currentSrc}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover transition-transform duration-700 ease-out will-change-transform ${
          isHovered ? "scale-[1.045]" : "scale-100"
        }`}
      />
    </div>

    {incomingSrc && (
      <div className="gallery-slide-next z-10 absolute inset-0 w-full h-full will-change-transform">
        <Image
          src={incomingSrc}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover transition-transform duration-700 ease-out will-change-transform ${
            isHovered ? "scale-[1.045]" : "scale-100"
          }`}
        />
      </div>
    )}
  </div>
);

const GalleryNewSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(null);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const isAnimating = useRef(false);
  
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const leftTitleRef = useRef(null);
  const img1Ref = useRef(null);
  const img2Ref = useRef(null);
  const img3Ref = useRef(null);
  const img4Ref = useRef(null);
  const img5Ref = useRef(null);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const navigate = useCallback(
    (dir = 1) => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      const target = (activeIndex + dir + TOTAL) % TOTAL;
      setDirection(dir);
      setNextIndex(target);
    },
    [activeIndex]
  );

  useEffect(() => {
    if (nextIndex !== null) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const timer = window.setTimeout(() => {
      navigate(1);
    }, AUTO_ADVANCE_DELAY);

    return () => window.clearTimeout(timer);
  }, [activeIndex, nextIndex, navigate]);

  // --- Externalized GSAP Hooks ---
  useGalleryEntrance({
    titleRef, leftTitleRef, descRef,
    img1Ref, img2Ref, img3Ref, img4Ref, img5Ref,
  });

  useGalleryTransition({
    nextIndex,
    direction,
    sectionRef,
    titleRef,
    leftTitleRef,
    descRef,
    onMidway: (index) => setDisplayIndex(index),
    onComplete: (index) => {
      setActiveIndex(index);
      setDisplayIndex(index);
      setNextIndex(null);
      isAnimating.current = false;
    }
  });

  const currentSlide = SLIDES[activeIndex];
  const textSlide = SLIDES[displayIndex];
  const incomingSlide = nextIndex !== null ? SLIDES[nextIndex] : null;

  return (
    <section
      ref={sectionRef}
      id="gallery-content"
      className="w-full h-screen m-0 p-0 flex box-border overflow-hidden relative mt-24 md:mt-32 scroll-mt-16"
    >
      {/* SECTION 1: Left Blue Column */}
      <div className="w-[20%] h-full relative">
        <p
          ref={leftTitleRef}
          className="tenorClass text-[#000000] text-[clamp(1.75rem,3.2vw,3.6rem)] font-normal tracking-tight leading-none uppercase whitespace-nowrap absolute -rotate-90 origin-top-right"
          style={{ top: "20%", right: 130 }}
        >
          {textSlide.title}
        </p>
        <div
          ref={img1Ref}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute left-0 bottom-10 w-[65%] h-[35%] overflow-hidden cursor-pointer"
          style={{ clipPath: "inset(0% 0% 0% 0%)" }}
        >
          <GalleryImageSlot
            currentSrc={currentSlide.images.img1}
            incomingSrc={incomingSlide?.images.img1}
            alt="Clinic gallery far left"
            sizes="(max-width: 768px) 50vw, 20vw"
            priority
            isHovered={isHovered}
            activeIndex={activeIndex}
          />
        </div>
      </div>

      {/* SECTION 2: Center Darker Slate-Blue Area */}
      <div className="w-[65%] h-full relative flex">
        <div className="w-[55%] h-full relative">
          <div
            ref={img2Ref}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="absolute top-0 left-0 w-full h-[78%] overflow-hidden cursor-pointer"
            style={{ clipPath: "inset(0% 0% 0% 0%)" }}
          >
            <GalleryImageSlot
              currentSrc={currentSlide.images.img2}
              incomingSrc={incomingSlide?.images.img2}
              alt="Clinic gallery main view"
              sizes="(max-width: 768px) 100vw, 45vw"
              priority
              isHovered={isHovered}
              activeIndex={activeIndex}
            />
          </div>
          <div className="absolute bottom-[8%] right-0 w-[72%] min-h-[10%] flex flex-col justify-center pr-4 cursor-default">
            <p
              ref={descRef}
              className="stackClass text-[clamp(1rem,1.2vw,1.3rem)] text-[#0b1b3a] leading-relaxed font-normal"
            >
              {textSlide.description}
            </p>
          </div>
        </div>

        <div className="w-[45%] h-full relative">
          <div
            ref={img3Ref}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="absolute top-0 right-[5%] w-[45%] h-[37%] overflow-hidden cursor-pointer"
            style={{ clipPath: "inset(0% 0% 0% 0%)" }}
          >
            <GalleryImageSlot
              currentSrc={currentSlide.images.img3}
              incomingSrc={incomingSlide?.images.img3}
              alt="Clinic gallery top right accent"
              sizes="(max-width: 768px) 40vw, 20vw"
              isHovered={isHovered}
              activeIndex={activeIndex}
            />
          </div>
          <div className="absolute top-[45%] left-[10%] w-[75%] min-h-[10%] flex flex-col justify-center cursor-default">
            <h2
              ref={titleRef}
              className="tenorClass text-[#0b1b3a] text-[clamp(1.75rem,3.2vw,3.6rem)] font-normal tracking-tight leading-none"
            >
              {textSlide.title}
            </h2>
          </div>
          <div
            ref={img4Ref}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="absolute bottom-0 right-0 w-[78%] h-[28%] overflow-hidden cursor-pointer"
            style={{ clipPath: "inset(0% 0% 0% 0%)" }}
          >
            <GalleryImageSlot
              currentSrc={currentSlide.images.img4}
              incomingSrc={incomingSlide?.images.img4}
              alt="Clinic gallery bottom center-right"
              sizes="(max-width: 768px) 50vw, 25vw"
              isHovered={isHovered}
              activeIndex={activeIndex}
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: Right Blue Column */}
      <div className="w-[20%] h-full relative">
        <div
          ref={img5Ref}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute top-[19%] left-5 w-[70%] h-[37%] overflow-hidden cursor-pointer"
          style={{ clipPath: "inset(0% 0% 0% 0%)" }}
        >
          <GalleryImageSlot
            currentSrc={currentSlide.images.img5}
            incomingSrc={incomingSlide?.images.img5}
            alt="Clinic gallery far right"
            sizes="(max-width: 768px) 40vw, 20vw"
            isHovered={isHovered}
            activeIndex={activeIndex}
          />
        </div>
      </div>
    </section>
  );
};

export default GalleryNewSection;