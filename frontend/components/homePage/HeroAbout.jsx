"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { useAboutAnimations } from "./HomeAni";

export default function HeroAbout() {
  const aboutRef = useRef(null);
  const blueDivRef = useRef(null);
  const amberDivRef = useRef(null);

  useAboutAnimations(aboutRef, blueDivRef, amberDivRef);

  return (
    <section
      ref={aboutRef}
      className="hero-about relative flex justify-between items-center min-h-screen w-full bg-background overflow-hidden"
    >
      <div className="flex flex-col gap-20 tenorClass text-7xl h-full w-full p-20">
        <div>About</div>
        {/* Fixed Tailwind: h-200 -> h-[500px], w-150 -> w-[300px] */}
        {/* Added 'relative' and 'overflow-hidden' for Next Image, removed bg-blue-600 */}
        <div
          ref={blueDivRef}
          className="relative h-190 w-150 transform-gpu overflow-hidden"
        >
          <Image 
            src="/LandingImage/javed2.jpg"
            alt="Doctor Javed Khan"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="eager"
            priority
          />
        </div>
      </div>

      <div className="flex flex-col gap-40 h-full w-full">
        {/* Fixed Tailwind: h-60, w-200 -> h-[240px] w-[800px] */}
        <div className="mt-20 h-60 w-200 flex">
          {/* Fixed Tailwind: w-120 -> w-[400px] */}
          <div className="p-1 font-stack text-[0.8rem] w-100 font-extralight">
            OVERVIEW
          </div>
          <div className="tenorClass text-3xl text-black/70">
            Dr. Javed Khan is passionate about dentistry, both inside and outside the clinic. Alongside caring for his patients, he regularly shares his knowledge through FM radio, talk shows, and speaking engagements, helping more people understand oral health and the importance of good dental care.
          </div>
        </div>
        {/* Fixed Tailwind: h-120, w-200 -> h-[400px] w-[800px] */}
        {/* Added 'relative' and 'overflow-hidden' for Next Image, removed bg-amber-400 */}
        <div
          ref={amberDivRef}
          className="relative mt-20 h-100 w-200 transform-gpu overflow-hidden"
        >
          <Image 
            src="/LandingImage/javed3.jpg"
            alt="Doctor Javed Khan"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}