"use client";
import { useEffect } from "react";

export default function ScrollToTop() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.history.scrollRestoration) {
        window.history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  return null; // It doesn't render any UI
}