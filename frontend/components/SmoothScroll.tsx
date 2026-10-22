"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<any>(null);

  // 1. Sync ScrollTrigger with Lenis using the official React hook
  useLenis((lenis) => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    // 2. Create the update function
    const update = (time: number) => {
      // DYNAMIC CHECK: Look for the instance inside the loop, not outside
      const lenisInstance = lenisRef.current?.lenis;
      if (lenisInstance) {
        lenisInstance.raf(time * 1000);
      }
    };

    // 3. Bind to GSAP ticker
    gsap.ticker.add(update);
    
    // 4. Critical Firefox fix
    gsap.ticker.lagSmoothing(0);

    // 5. Cleanup
    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis 
      ref={lenisRef} 
      autoRaf={false} 
      root 
      options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}
    >
      {children}
    </ReactLenis>
  );
}