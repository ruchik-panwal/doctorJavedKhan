"use client"
import React, { useRef, useEffect } from "react";
import HeroAbout from "./HeroAbout";
import Header from "../Header"
import { useHeroAnimations } from "./HomeAni";

export default function HeroSection() {
  const sectionRef = useRef(null);
  const aboutRef = useRef(null);
  const blueDivRef = useRef(null);
  const amberDivRef = useRef(null);

  // 1. Force scroll to top on refresh
  useEffect(() => {
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useHeroAnimations(sectionRef, aboutRef, blueDivRef, amberDivRef);

  return (
    <div ref={sectionRef} className="relative h-screen w-screen overflow-hidden">
      <Header />
      <div className="flex h-full w-full items-center justify-center bg-gray-200 text-5xl">
        Main Hero Section
      </div>
      <HeroAbout 
        aboutRef={aboutRef} 
        blueDivRef={blueDivRef} 
        amberDivRef={amberDivRef} 
      />
    </div>
  );
}