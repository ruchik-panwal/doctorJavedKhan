"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<any>(null);

  // 1. Sync ScrollTrigger with Lenis using the official React hook
  useLenis((lenis) => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    // 2. Create the update function for GSAP ticker
    const update = (time: number) => {
      const lenisInstance = lenisRef.current?.lenis;
      if (lenisInstance) {
        lenisInstance.raf(time * 1000);
      }
    };

    // 3. Bind to GSAP ticker
    gsap.ticker.add(update);
    
    // 4. Critical Firefox fix
    gsap.ticker.lagSmoothing(0);

    // 5. Force ScrollTrigger to refresh when the body height changes
    // This prevents the scroll from getting stuck at the bottom if images load late
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    
    // Start observing the body for layout/height shifts
    resizeObserver.observe(document.body);

    // 6. Cleanup
    return () => {
      gsap.ticker.remove(update);
      resizeObserver.disconnect(); // Clean up the observer when component unmounts
    };
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
    </ReactLenis>
  )
}
