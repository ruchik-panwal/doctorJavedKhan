'use client'
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register ScrollTrigger once in this file
gsap.registerPlugin(ScrollTrigger);

// --- Data ---
// Array of curated Unsplash images cropped to 600x800
const unsplashImages = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&h=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&h=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&h=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&h=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&h=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=600&h=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&h=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600&h=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=600&h=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507238692062-5a042e9e18b4?q=80&w=600&h=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1481481352542-a8c630fb2886?q=80&w=600&h=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=600&h=800&auto=format&fit=crop"
];

const projects = unsplashImages.map((url, i) => ({
  id: i + 1,
  image: url,
}));

// --- 1. Custom Animation Hook for WorkCard ---
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
    { scope: cardRef }
  );

  const handleMouseEnter = contextSafe(() => tl.current?.play());
  const handleMouseLeave = contextSafe(() => tl.current?.reverse());

  return { handleMouseEnter, handleMouseLeave };
}

// --- 2. WorkCard Sub-Components ---
const BackLayer = ({ index, image }) => {
  return (
    <div className="absolute inset-0 p-1 px-2 flex flex-col justify-between bg-background border">
      <div>
        <h1 className="tenorClass text-[2rem]">NYU College of Dentistry</h1>
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

// --- 3. WorkCard Component ---
function WorkCard({ index, image }) {
  const isEvenColumn = index % 2 === 1;
  const cardRef = useRef(null);

  const { handleMouseEnter, handleMouseLeave } = useWorkCardHover(cardRef);

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        w-full h-150 relative overflow-hidden rounded-sm bg-neutral-900 cursor-pointer
        ${isEvenColumn ? "col-even" : "col-odd"}
      `}
    >
      <BackLayer index={index} image={image} />
      <FrontLayer index={index} image={image} />
    </div>
  );
}

// --- 4. Main Work Section Component ---
export default function Work() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Animate columns 2 and 4 (even indices: 1, 3, 5...) moving up faster
    gsap.to(".col-even", {
      y: -250, 
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1, // Smooth scrubbing
      },
    });

    // Animate columns 1 and 3 (odd indices: 0, 2, 4...) moving slightly down/slower
    gsap.to(".col-odd", {
      y: 100,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, { scope: containerRef });

  return (
    <section className="min-h-screen p-4 overflow-hidden px-20" ref={containerRef}>
      <div className="grid grid-cols-4 gap-4 mt-32 mb-32">
        {projects.map((project, index) => (
          <WorkCard key={project.id} index={index} image={project.image} />
        ))}
      </div>
    </section>
  );
}