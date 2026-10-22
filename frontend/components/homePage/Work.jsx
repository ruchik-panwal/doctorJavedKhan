'use client'
import { useRef } from "react";
import WorkCard from "./WorkCard"
import { useWorkAnimations } from "../animations/useWorkAnimation"; // Adjust path if needed

const projects = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
}));

export default function Work() {
  const containerRef = useRef(null);

  // Apply the GSAP animations using our custom hook
  useWorkAnimations(containerRef);

  return (
    <section className="min-h-screen bg-white p-4 overflow-hidden px-20" ref={containerRef}>
      <div className="grid grid-cols-4 gap-4 mt-32 mb-32">
        {projects.map((project, index) => (
          <WorkCard key={project.id} index={index} />
        ))}
      </div>
    </section>
  );
}

