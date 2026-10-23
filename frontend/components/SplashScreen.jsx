"use client";
import { useEffect, useRef, useState } from "react";

// Module-level flag: if splash already ran in this JS lifetime, skip it
let hasSplashShown = false;

export default function SplashScreen() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const fadeTimer = useRef(null);
  const unmountTimer = useRef(null);

  useEffect(() => {
    // Only runs client-side, after hydration
    const alreadyShown =
      hasSplashShown ||
      (() => {
        try {
          return sessionStorage.getItem("splash_shown") === "true";
        } catch (_) {
          return false;
        }
      })();

    if (alreadyShown) {
      // Notify any listeners that splash was skipped so they can proceed immediately
      window.dispatchEvent(new CustomEvent("splashFadeStart"));
      return;
    }

    // Mark as shown in this session
    hasSplashShown = true;
    try {
      sessionStorage.setItem("splash_shown", "true");
    } catch (_) {}

    // Show the splash overlay
    setVisible(true);

    const ANIMATION_DURATION = 3100; // ms — SVG logo finishes at ~3.0s
    const FADE_DURATION = 800;       // ms — smooth fade-out (under 1s)

    // After SVG finishes, start fade-out and trigger hero section entrance simultaneously
    fadeTimer.current = setTimeout(() => {
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
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: "#F3F3EC",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fading ? 0 : 1,
        transition: "opacity 800ms cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: fading ? "none" : "all",
        willChange: "opacity",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/Logo/animated_logo.svg"
        alt="Doctor Javed Khan Logo"
        style={{
          width: "min(85vw, 650px)",
          height: "auto",
          display: "block",
        }}
        draggable={false}
      />
    </div>
  );
}
