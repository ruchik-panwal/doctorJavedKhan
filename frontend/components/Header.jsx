"use client";

import { useState } from "react";
import Link from "next/link";
import useTextRolloverAni from "./animations/headerBtnAni";

// Extracted Component: Logo
const Logo = ({ inAnimation, outAnimation, closeMenu }) => (
  <Link
    href="/"
    onClick={closeMenu}
    className="relative block overflow-hidden tenorClass text-[1.1rem] text-foreground z-50"
  >
    <span className="orig-text block">Javed Khan</span>
    <span className="duplicate-text absolute left-0 top-0 block w-full h-full">
      Javed Khan
    </span>
  </Link>
);

// Extracted Component: Hamburger Icon
const Hamburger = ({ isMenuOpen, toggleMenu }) => (
  <button
    className="md:hidden flex flex-col gap-1.5 p-1 z-50 focus:outline-none"
    onClick={toggleMenu}
    aria-label="Toggle Menu"
  >
    <span className={`w-6 h-0.5 bg-foreground transition-all duration-300 origin-center ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
    <span className={`w-6 h-0.5 bg-foreground transition-all duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
    <span className={`w-6 h-0.5 bg-foreground transition-all duration-300 origin-center ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
  </button>
);

// Extracted Component: Animated Navigation Button
const AnimatedButton = ({ onClick, inAnimation, outAnimation, children }) => (
  <button
    onClick={onClick}
    onMouseEnter={inAnimation}
    onMouseLeave={outAnimation}
    className="relative block overflow-hidden cursor-pointer w-full text-left md:w-auto"
  >
    <span className="orig-text block">{children}</span>
    <span className="duplicate-text absolute left-0 top-0 block w-full h-full">
      {children}
    </span>
  </button>
);

// Extracted Component: Animated Navigation Link
const AnimatedLink = ({ href, onClick, inAnimation, outAnimation, children }) => (
  <Link
    href={href}
    onClick={onClick}
    onMouseEnter={inAnimation}
    onMouseLeave={outAnimation}
    className="relative block overflow-hidden cursor-pointer w-full text-left md:w-auto"
  >
    <span className="orig-text block">{children}</span>
    <span className="duplicate-text absolute left-0 top-0 block w-full h-full">
      {children}
    </span>
  </Link>
);

// Main Header Component
export default function Header() {
  const { inAnimation, outAnimation } = useTextRolloverAni();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="flex justify-between items-center px-2 md:px-2 w-full bg-background z-50 shrink-0 relative">
      <Logo 
        inAnimation={inAnimation} 
        outAnimation={outAnimation} 
        closeMenu={closeMenu} 
      />

      <Hamburger 
        isMenuOpen={isMenuOpen} 
        toggleMenu={toggleMenu} 
      />

      <nav
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row absolute md:static top-full left-0 w-full md:w-auto bg-background md:bg-transparent shadow-lg md:shadow-none p-3 md:p-0 gap-5 md:gap-5 text-[0.8rem] text-foreground items-start md:items-center stackClass font-light z-40`}
      >
        <AnimatedButton onClick={closeMenu} inAnimation={inAnimation} outAnimation={outAnimation}>
          Royal Dental Care
        </AnimatedButton>

        <AnimatedButton onClick={closeMenu} inAnimation={inAnimation} outAnimation={outAnimation}>
          Our Team
        </AnimatedButton>

        <AnimatedLink href="/gallery" onClick={closeMenu} inAnimation={inAnimation} outAnimation={outAnimation}>
          Gallery
        </AnimatedLink>

        <AnimatedButton onClick={closeMenu} inAnimation={inAnimation} outAnimation={outAnimation}>
          About
        </AnimatedButton>
      </nav>
    </header>
  );
}