'use client'
import { useRef } from "react";
import WorkCard from "./WorkCard";
import { useWorkAnimations } from "../animations/useWorkAnimation"; // Adjust path if needed

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

export default function Work() {
  const containerRef = useRef(null);

  useWorkAnimations(containerRef);

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