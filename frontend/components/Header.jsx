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
    <header className="flex justify-between items-center px-6 md:px-12 py-3.5 w-full bg-background z-30 shrink-0">
      <Link href="/" className="tenorClass text-2xl md:text-3xl text-foreground hover:opacity-80 transition-opacity">
        Javed Khan
      </Link>
      <nav className="stackClass font-light flex items-center gap-6 md:gap-10 text-lg md:text-xl text-foreground">
        <button className="hover:opacity-70 transition-opacity cursor-pointer">Royal Dental Care</button>
        <button className="hover:opacity-70 transition-opacity cursor-pointer">Our Team</button>
        <Link href="/gallery" className="hover:opacity-70 transition-opacity cursor-pointer">Gallery</Link>
        <button className="hover:opacity-70 transition-opacity cursor-pointer">About</button>
      </nav>
    </header>
  );
}