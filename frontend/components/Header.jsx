"use client";

import Link from "next/link";
// Adjust the import path below to match where you saved the hook file
import useTextRolloverAni from "./animations/useTextRollOverAnimation"; 

// Reusable Animated Link Component
const AnimatedLink = ({ href, children }) => {
  const { inAnimation, outAnimation } = useTextRolloverAni();

  return (
    <Link
      href={href}
      onMouseEnter={inAnimation}
      onMouseLeave={outAnimation}
      className="relative block overflow-hidden cursor-pointer"
    >
      <span className="orig-text block">{children}</span>
      <span className="duplicate-text absolute left-0 top-0 block w-full h-full">
        {children}
      </span>
    </Link>
  );
};

// Main Header Component
export default function Header() {
  return (
    <nav className="flex justify-between items-center border-b border-borderColor px-2 w-full">
      <div className="tenorClass text-[1.5rem]">Dr. Javed Khan</div>
      <div className="stackClass font-light flex justify-between items-center gap-5 text-[1.1rem]">
        <AnimatedLink href="/royal-dental-care">Royal Dental Care</AnimatedLink>
        <AnimatedLink href="/gallery">Gallery</AnimatedLink>
        <AnimatedLink href="/team">Our Team</AnimatedLink>
        <AnimatedLink href="/about">About</AnimatedLink>
      </div>
    </nav>
  );
}