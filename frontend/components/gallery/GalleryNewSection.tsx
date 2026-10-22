"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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

interface GalleryImageSlotProps {
  currentSrc: string;
  incomingSrc?: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  isHovered: boolean;
  activeIndex: number;
}

const GalleryImageSlot = ({
  currentSrc,
  incomingSrc,
  alt,
  sizes,
  priority,
  isHovered,
  activeIndex,
}: GalleryImageSlotProps) => (
  <div className="relative w-full h-full overflow-hidden">
    {/* Current / Outgoing image */}
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

    {/* Incoming image (slides simultaneously alongside current) */}
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
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isHovered, setIsHovered] = useState(false);
  const isAnimating = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Text refs
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const leftTitleRef = useRef<HTMLParagraphElement>(null);

  // Image wrapper refs (5 images from left to right)
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);
  const img4Ref = useRef<HTMLDivElement>(null);
  const img5Ref = useRef<HTMLDivElement>(null);

  // Handlers for collective subtle zoom on all images in section
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Entrance animation: Text appears from above, then images wipe in from right to left
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(
      [titleRef.current, leftTitleRef.current, descRef.current].filter(Boolean),
      {
        y: -28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
      },
    ).from(
      [
        img1Ref.current,
        img2Ref.current,
        img3Ref.current,
        img4Ref.current,
        img5Ref.current,
      ].filter(Boolean),
      {
        clipPath: "inset(0 0 0 100%)",
        duration: 1.1,
        stagger: 0.07,
        ease: "power3.out",
      },
      "-=0.45",
    );
  }, []);

  // Coordinated slide transition:
  // Outgoing image slides aside while incoming image enters simultaneously
  const navigate = useCallback(
    (dir: 1 | -1 = 1) => {
      if (isAnimating.current) return;
      isAnimating.current = true;

      const target = (activeIndex + dir + TOTAL) % TOTAL;
      setDirection(dir);
      setNextIndex(target);
    },
    [activeIndex],
  );

  useGSAP(
    () => {
      if (nextIndex === null || !sectionRef.current) return;

      const currentImgs = sectionRef.current.querySelectorAll(
        ".gallery-slide-curr",
      );
      const nextImgs = sectionRef.current.querySelectorAll(
        ".gallery-slide-next",
      );

      const textEls = [
        titleRef.current,
        leftTitleRef.current,
        descRef.current,
      ].filter(Boolean);

      // Pre-position incoming images off-screen in direction of travel
      gsap.set(nextImgs, {
        xPercent: direction > 0 ? 100 : -100,
      });

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(currentImgs, { xPercent: 0 });
          setActiveIndex(nextIndex);
          setDisplayIndex(nextIndex);
          setNextIndex(null);
          isAnimating.current = false;
        },
      });

      // 1. Current text exits
      tl.to(textEls, {
        y: direction > 0 ? 24 : -24,
        opacity: 0,
        duration: 0.35,
        stagger: 0.04,
        ease: "power2.inOut",
      });

      // 2. Synchronized image push: current moves aside while next enters
      tl.to(
        currentImgs,
        {
          xPercent: direction > 0 ? -100 : 100,
          duration: 0.85,
          stagger: 0.05,
          ease: "power3.inOut",
        },
        "-=0.15",
      ).to(
        nextImgs,
        {
          xPercent: 0,
          duration: 0.85,
          stagger: 0.05,
          ease: "power3.inOut",
        },
        "<",
      );

      // 3. Text content updates midway through slide and enters
      tl.add(() => {
        setDisplayIndex(nextIndex);
      }, "-=0.45");

      tl.fromTo(
        textEls,
        { y: direction > 0 ? -24 : 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.05,
          ease: "power3.out",
        },
        "-=0.35",
      );
    },
    { dependencies: [nextIndex], scope: sectionRef },
  );

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
        {/* Rotated title — anchored to top-right corner so position never shifts with title length */}
        <p
          ref={leftTitleRef}
          className="tenorClass text-[#000000] text-[clamp(1.75rem,3.2vw,3.6rem)] font-normal tracking-tight leading-none uppercase whitespace-nowrap absolute -rotate-90 origin-top-right"
          style={{ top: "20%", right: 130 }}
        >
          {textSlide.title}
        </p>
        {/* Left Green Block -> Image 1 (Far Left) */}
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
        {/* Left Sub-column inside Center */}
        <div className="w-[55%] h-full relative">
          {/* Big Green Square/Block Top -> Image 2 (Middle Left) */}
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

          {/* Yellow Bar Bottom Right -> Below Text (Lorem Ipsum) */}
          <div className="absolute bottom-[8%] right-0 w-[72%] min-h-[10%] flex flex-col justify-center pr-4 cursor-default">
            <p
              ref={descRef}
              className="stackClass text-[clamp(1rem,1.2vw,1.3rem)] text-[#0b1b3a] leading-relaxed font-normal"
            >
              {textSlide.description}
            </p>
          </div>
        </div>

        {/* Right Sub-column inside Center */}
        <div className="w-[45%] h-full relative">
          {/* Top Right Green Tall Box -> Image 3 */}
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

          {/* Middle Yellow Bar -> Right Middle Text ("Architect" Heading) */}
          <div className="absolute top-[45%] left-[10%] w-[75%] min-h-[10%] flex flex-col justify-center cursor-default">
            <h2
              ref={titleRef}
              className="tenorClass text-[#0b1b3a] text-[clamp(1.75rem,3.2vw,3.6rem)] font-normal tracking-tight leading-none"
            >
              {textSlide.title}
            </h2>
          </div>

          {/* Bottom Right Green Square -> Image 4 */}
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
        {/* Right Green Block -> Image 5 (Far Right) */}
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

        {/* Bottom Small Yellow Bar -> "Next" Button */}
        <div className="absolute bottom-[5%] right-10 w-[45%] min-h-[5%] flex items-center justify-end">
          <button
            onClick={() => navigate(1)}
            aria-label="Next slide"
            className="flex flex-col items-center gap-1.5 group cursor-pointer select-none text-[#0b1b3a] hover:opacity-75 transition-opacity"
          >
            <span className="tenorClass font-bold text-[clamp(0.75rem,0.9vw,1rem)] uppercase tracking-[0.25em]">
              Next
            </span>
            <svg
              viewBox="0 0 40 12"
              className="w-8 h-3 text-[#0b1b3a] transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M2 6h36M32 1l6 5-6 5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default GalleryNewSection;
