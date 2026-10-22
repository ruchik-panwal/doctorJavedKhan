'use client';
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// --- Extracted Components ---

const BackLayer = ({ index }) => {
  return (
    <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
      <h3 className="text-3xl font-bold">Project Name {index}</h3>
      <p className="mt-2 text-neutral-300">View project details &rarr;</p>
    </div>
  );
};

const FrontLayer = ({ index }) => {
  return (
    <div className="front-layer absolute inset-0 z-10 bg-[#d9d9d9]">
      <img 
        src="https://placehold.co/600x800/d9d9d9/333333?text=Project+Image" 
        alt={`Project ${index}`} 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

// --- Main Component ---

export default function WorkCard({ index }) {
  const isEvenColumn = index % 2 === 1;
  const cardRef = useRef(null);
  
  // Store the timeline in a ref so we can play/reverse it on hover
  const tl = useRef(null);

  useGSAP(() => {
    // 1. Create a timeline that is paused by default
    tl.current = gsap.timeline({ paused: true })
      .to(".front-layer", {
        yPercent: 100, // Slides the front div down by 100% of its height
        duration: 0.5,
        ease: "power3.inOut",
      });
  }, { scope: cardRef }); // scope ensures GSAP only animates the layer inside THIS specific card

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => tl.current?.play()}
      onMouseLeave={() => tl.current?.reverse()}
      className={`
        w-full h-[600px] relative overflow-hidden rounded-sm bg-neutral-900 cursor-pointer
        ${isEvenColumn ? "col-even" : "col-odd"}
      `}
    >
      {/* 2. BACK LAYER COMPONENT */}
      <BackLayer index={index} />

      {/* 3. FRONT LAYER COMPONENT */}
      <FrontLayer index={index} />
    </div>
  );
}