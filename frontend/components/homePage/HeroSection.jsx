"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Header from "../Header";
import HeroAbout from "@/components/homePage/HeroAbout";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HeroSection() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: container.current,
            start: "top top",
            end: "+=100%",
            scrub: true,
            pin: true,
          },
        })
        .fromTo(
          ".hero-about",
          { yPercent: 100 },
          { yPercent: 0, ease: "power1.in" }
        );
    },
    { scope: container }
  );

  return (
    <div
      ref={container}
      className="relative overflow-hidden flex flex-col justify-between items-center h-screen w-screen border-b border-borderColor"
    >
      <Header />
      <div className="h-full w-full bg-amber-400"></div>
      <HeroAbout />
    </div>
  );
}