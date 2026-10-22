"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

// --- 1. Custom Animation Hook ---
function useWorkCardHover(cardRef) {
  const tl = useRef(null);
  const { contextSafe } = useGSAP({ scope: cardRef });

  useGSAP(
    () => {
      tl.current = gsap.timeline({ paused: true }).to(".front-layer", {
        yPercent: 100,
        duration: 0.5,
        ease: "power3.inOut",
      });
    },
    { scope: cardRef },
  );

  const handleMouseEnter = contextSafe(() => tl.current?.play());
  const handleMouseLeave = contextSafe(() => tl.current?.reverse());

  return { handleMouseEnter, handleMouseLeave };
}

// --- 2. Extracted Components ---
// Accept the image prop here
const BackLayer = ({ index, image }) => {
  return (
    <div className="absolute inset-0 p-1 px-2 flex flex-col justify-between bg-background border">
      <div>
        <h1 className="tenorClass text-[2rem]">NYU College of Dentistry</h1>
        {/* Pass the image here, and add required width/height/alt for Next.js */}
        <Image 
          src={image} 
          alt={`Project ${index} detail`}
          width={600}
          height={300}
          className="object-cover w-full h-60" 
        />
        <p className="mt-5 text-[1.4rem] stackClass">
          We’ve reimagined dental care through thoughtful spaces, advanced
          treatments, and a calming, personalized experience.
        </p>
      </div>

      <div className="w-full underline text-right">Go to page</div>
    </div>
  );
};

// Accept the image prop here
const FrontLayer = ({ index, image }) => {
  return (
    <div className="front-layer absolute inset-0 z-10 bg-[#d9d9d9]">
      <Image
        src={image}
        alt={`Project ${index}`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
      />
    </div>
  );
};

// --- 3. Main Component ---
// Accept the image prop here as well
export default function WorkCard({ index, image }) {
  const isEvenColumn = index % 2 === 1;
  const cardRef = useRef(null);

  const { handleMouseEnter, handleMouseLeave } = useWorkCardHover(cardRef);

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        w-full h-[600px] relative overflow-hidden rounded-sm bg-neutral-900 cursor-pointer
        ${isEvenColumn ? "col-even" : "col-odd"}
      `}
    >
      {/* Pass the image down to the BackLayer */}
      <BackLayer index={index} image={image} />

      {/* Pass the image down to the FrontLayer */}
      <FrontLayer index={index} image={image} />
    </div>
  );
}