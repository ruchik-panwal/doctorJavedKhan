"use client";
import React, { useRef, forwardRef } from "react";
import Image from "next/image";
import { useAboutAnimations } from "../animations/homePage/homeAboutAni";

export default function HomeAbout() {
  const aboutRef = useRef(null);
  const blueDivRef = useRef(null);
  const amberDivRef = useRef(null);

  useAboutAnimations(aboutRef, blueDivRef, amberDivRef);

  return (
    <section
      ref={aboutRef}
      className="hero-about relative flex flex-col md:flex-row justify-between items-center min-h-screen w-full bg-background overflow-hidden"
    >
      {/* flex-1 allows this column to absorb width changes fluidly */}
      <div className="flex-1 flex flex-col gap-5 md:gap-10 lg:gap-10 tenorClass text-7xl h-full w-full p-5 md:p-10 lg:p-20 mt-10 md:mt-0">
        <div className="w-full text-center md:text-left">About</div>
        <Image1 ref={blueDivRef} />
      </div>

      {/* flex-1 allows this column to absorb width changes fluidly */}
      <div className="flex-1 flex flex-col md:justify-center gap-10 lg:gap-20 h-full w-full p-5 md:p-10 lg:p-0 lg:pr-20">
        <Overview />
        <Image2 ref={amberDivRef} />
      </div>
    </section>
  );
}

const Overview = forwardRef((props, ref) => {
  return (
    <div 
      ref={ref} 
      className="mt-10 md:mt-0 lg:mt-20 h-auto w-full flex flex-col md:flex-row items-center md:items-start"
    >
      <div className="p-1 font-stack text-[0.8rem] w-full md:w-24 lg:w-32 shrink-0 font-extralight mb-2 md:mb-0 md:mr-5 text-center md:text-left underline md:no-underline">
        OVERVIEW
      </div>
      
      {/* Reduced font sizes on md and lg breakpoints so it doesn't look too long/bulky on iPads */}
      <div className="flex-1 tenorClass text-base md:text-lg lg:text-[18px] xl:text-[25px] text-black/70 text-center md:text-left px-4 md:px-0 leading-7">
        Dr. Javed Khan is passionate about dentistry, both inside and outside
        the clinic. Alongside caring for his patients, he regularly shares his
        knowledge through FM radio, talk shows, and speaking engagements,
        helping more people understand oral health and the importance of good
        dental care.
      </div>
    </div>
  );
});
Overview.displayName = "Overview";

const Image1 = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      // Removed fixed w-150/h-190. Pure aspect ratio ensures buttery-smooth resizing.
      className="relative w-full lg:w-[90%] aspect-4/5 transform-gpu overflow-hidden mx-auto md:mx-0"
    >
      <Image
        src="/LandingImage/javed2.jpg"
        alt="Doctor Javed Khan"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        loading="eager"
        priority
      />
    </div>
  );
});
Image1.displayName = "Image1";

const Image2 = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      // Removed fixed w-200/h-100. Uses aspect-[2/1] so it perfectly scales width/height together.
      className="relative mt-10 lg:mt-20 w-full aspect-2/1 overflow-hidden hidden lg:block"
    >
      <Image
        src="/LandingImage/javed3.jpg"
        alt="Doctor Javed Khan"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
});
Image2.displayName = "Image2";
