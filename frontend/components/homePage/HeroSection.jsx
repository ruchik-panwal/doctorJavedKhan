"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Header from "../Header";
import gsap from "gsap";

// Module-level flag: prevents re-triggering during SPA route changes (Home -> Gallery -> Home)
let hasHeroAnimated = false;

export default function HeroSection() {
  const imageRef = useRef(null);
  const wordsRef = useRef([]);

  // 1. Force scroll to top on refresh
  useEffect(() => {
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // 2. Sequenced load animation: hero image light fade-in -> blur text animation
  useEffect(() => {
    if (hasHeroAnimated) {
      // If already animated in this SPA session, show immediately without re-animating
      if (imageRef.current) {
        gsap.set(imageRef.current, { opacity: 1 });
      }
      if (wordsRef.current?.length) {
        gsap.set(wordsRef.current, { opacity: 1, filter: "blur(0px)" });
      }
      return;
    }

    // Mark as animated for in-app navigation
    hasHeroAnimated = true;

    if (!imageRef.current || !wordsRef.current || wordsRef.current.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      // Step 1: Light fade-in for the doctor hero image
      tl.to(imageRef.current, {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
      })
      // Step 2: Continue with the staggered blur text animation for the headline words
      .to(
        wordsRef.current,
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.4,
          stagger: 0.45,
          ease: "power2.out",
        },
        "-=0.4"
      );
    });

    return () => ctx.revert();
  }, []);

  const headlineWords = ["Dr.", "Javed", "Khan"];

  return (
    <div className="relative h-screen w-full flex flex-col overflow-hidden bg-background">
      <Header />
      
      {/* Main Hero Container */}
      <section className="relative flex-1 w-full overflow-hidden flex items-end justify-center select-none bg-[#141517]">
        {/* Background Gradient Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/LandingImage/hero-bg-2k.png"
            alt="Hero Background"
            fill
            priority
            className="object-cover object-center pointer-events-none"
            sizes="100vw"
          />
          {/* Subtle vignette / depth glow overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 85% 65% at 50% 90%, rgba(55, 57, 60, 0.35) 0%, rgba(20, 21, 23, 0.2) 55%, rgba(14, 15, 17, 0.7) 100%)",
            }}
          />
        </div>

        {/* Doctor Image */}
        <div 
          ref={imageRef}
          className="relative z-10 w-full h-full flex items-end justify-center pointer-events-none"
          style={{ opacity: 0, willChange: "opacity" }}
        >
          <div className="relative h-full w-full max-w-[1500px] flex items-end justify-center">
            <Image
              src="/LandingImage/javed-hero-clean.png"
              alt="Dr. Javed Khan"
              width={800}
              height={780}
              priority
              className="h-[98.5%] w-auto max-w-[95vw] lg:max-w-none object-contain object-bottom select-none pointer-events-none drop-shadow-[0_20px_45px_rgba(0,0,0,0.65)]"
            />
          </div>
        </div>

        {/* Big Bold Headline: Dr. Javed Khan */}
        <div className="absolute bottom-[1.5%] sm:bottom-[2%] md:bottom-[2.2%] left-0 right-0 z-20 flex justify-center items-center pointer-events-none px-2 sm:px-4">
          <h1 
            className="tenorClass text-center whitespace-nowrap select-none font-bold"
            style={{
              fontFamily: "'Tenor Sans', var(--font-tenor-sans), Georgia, serif",
              fontSize: "clamp(3.5rem, 10.4vw, 12.2rem)",
              letterSpacing: "-0.05em",
              lineHeight: 0.88,
              filter: "drop-shadow(0 6px 20px rgba(0, 0, 0, 0.65))",
            }}
          >
            {headlineWords.map((word, index) => (
              <span
                key={index}
                ref={(el) => (wordsRef.current[index] = el)}
                className="inline-block"
                style={{
                  background: "linear-gradient(180deg, #FFFFFF 0%, #EAEAEF 52%, #B2B2BA 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginRight: index < headlineWords.length - 1 ? "0.22em" : "0",
                  opacity: 0,
                  filter: "blur(14px)",
                  willChange: "filter, opacity",
                }}
              >
                {word}
              </span>
            ))}
          </h1>
        </div>
      </section>
    </div>
  );
}