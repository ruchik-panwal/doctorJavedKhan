"use client";
import React, { useRef, forwardRef } from "react";
import Image from "next/image";
import { useAboutAnimations } from "../animations/homePage/homeAboutAni";

// 1. Data Object for all content
const ABOUT_DATA = {
  heading: "About",
  overview: {
    label: "OVERVIEW",
    text: "Dr. Javed Khan is passionate about dentistry, both inside and outside the clinic. Alongside caring for his patients, he regularly shares his knowledge through FM radio, talk shows, and speaking engagements, helping more people understand oral health and the importance of good dental care.",
  },
  images: {
    primary: {
      src: "/LandingImage/javed2.jpg",
      alt: "Doctor Javed Khan",
    },
    secondary: {
      src: "/LandingImage/javed3.jpg",
      alt: "Doctor Javed Khan",
    },
  },
};

export default function HomeAbout() {
  const aboutRef = useRef(null);
  const blueDivRef = useRef(null);
  const amberDivRef = useRef(null);

  useAboutAnimations(aboutRef, blueDivRef, amberDivRef);

  return (
    <section
      ref={aboutRef}
      className="hero-about relative flex min-h-screen w-full flex-col items-center justify-center gap-10 overflow-hidden bg-background px-6 py-12 md:flex-row md:px-30 md:py-0 lg:gap-20"
    >
      {/* Left Column */}
      <div className="flex h-full w-full flex-1 flex-col justify-center gap-5">
        <h2 className="w-full text-center font-tenor text-[clamp(3.5rem,7.6vw,5.75rem)] leading-[0.86] tracking-[-0.08em] md:text-left">
          {ABOUT_DATA.heading}
        </h2>
        <Image1 ref={blueDivRef} />
      </div>

      {/* Right Column */}
      <div className="flex h-full w-full flex-1 flex-col justify-center gap-10 lg:gap-20">
        <Overview />
        <Image2 ref={amberDivRef} />
      </div>
    </section>
  );
}

const Overview = () => {
  return (
    <div className="mt-10 flex h-auto w-full flex-col items-center md:mt-0 md:flex-row md:items-start lg:mt-20">
      <div className="mb-2 w-full shrink-0 p-1 text-center font-stack text-[0.8rem] font-extralight underline md:mb-0 md:mr-5 md:w-24 md:text-left md:no-underline lg:w-32">
        {ABOUT_DATA.overview.label}
      </div>

      <div className="tenorClass flex-1 px-4 text-center text-base leading-7 text-black/70 md:px-0 md:text-left md:text-lg lg:text-[18px] xl:text-[25px]">
        {ABOUT_DATA.overview.text}
      </div>
    </div>
  );
};

const Image1 = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-[4/5] w-full transform-gpu overflow-hidden md:mx-0 lg:w-[70%]"
    >
      <Image
        src={ABOUT_DATA.images.primary.src}
        alt={ABOUT_DATA.images.primary.alt}
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
      className="relative mt-10 hidden aspect-[2/1] w-full overflow-hidden lg:mt-20 lg:block"
    >
      <Image
        src={ABOUT_DATA.images.secondary.src}
        alt={ABOUT_DATA.images.secondary.alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
});
Image2.displayName = "Image2";