"use client";
import { useEffect, useRef, useState } from "react";

// Module-level flag: persists across client-side route changes, resets on page reload
let hasSplashShown = false;

export const isSplashPending = () => {
  return !hasSplashShown;
};

export default function SplashScreen() {
  const [visible, setVisible] = useState(() => !hasSplashShown);
  const [fading, setFading] = useState(false);
  const fadeTimer = useRef(null);
  const unmountTimer = useRef(null);

  useEffect(() => {
    if (hasSplashShown) {
      window.dispatchEvent(new CustomEvent("splashFadeStart"));
      return;
    }

    const ANIMATION_DURATION = 3100; // ms — SVG logo finishes at ~3.0s
    const FADE_DURATION = 800;       // ms — smooth fade-out

    // After SVG finishes, start fade-out and trigger hero section entrance simultaneously
    fadeTimer.current = setTimeout(() => {
      hasSplashShown = true;
      setFading(true);
      window.dispatchEvent(new CustomEvent("splashFadeStart"));
    }, ANIMATION_DURATION);

    // After fade-out completes, unmount overlay entirely from DOM
    unmountTimer.current = setTimeout(() => {
      setVisible(false);
      window.dispatchEvent(new CustomEvent("splashComplete"));
    }, ANIMATION_DURATION + FADE_DURATION);

    return () => {
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
      if (unmountTimer.current) clearTimeout(unmountTimer.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-99999 flex items-center justify-center bg-[#F3F3EC] transition-opacity duration-800 ease-in-out ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
      }`}
      style={{ willChange: "opacity" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/Logo/animated_logo.svg"
        alt="Doctor Javed Khan Logo"
        // Responsive widths and desktop cap increased by another 10%
        className="w-[112.2vw] sm:w-[92.4vw] md:w-[79.2vw] lg:w-[66vw] max-w-[858px] h-auto block"
        draggable={false}
      />
    </div>
  );
}