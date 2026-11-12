"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function QuoteSection() {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);

  useGSAP(
    () => {
      const quote = quoteRef.current;
      if (!quote) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(quote, { opacity: 1 });
        return;
      }

      gsap.set(quote, { opacity: 0 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          gsap.to(quote, {
            opacity: 1,
            duration: 1.4,
            ease: "power2.out",
          });
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="flex min-h-svh w-full items-center justify-center bg-background px-6 text-center text-foreground sm:px-10"
    >
      <blockquote
        ref={quoteRef}
        className="m-0 max-w-3xl font-tenor text-[clamp(1.8rem,4.8vw,3rem)] leading-tight tracking-tight"
      >
        “You&apos;re <strong className="font-semibold">braver</strong> than you
        believe, and stronger than you seem, and smarter than you{" "}
        <strong className="font-semibold">think.</strong>”
      </blockquote>
    </section>
  );
}
