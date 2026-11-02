import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { isSplashPending } from "@/components/SplashScreen";

// Module-level flag: prevents re-playing the hero intro during SPA route changes (Home -> Gallery -> Home)
let hasHeroAnimated = false;

export const useHeroIntro = ({ imageRef, wordsRef }) => {
  useGSAP(() => {
    const image = imageRef.current;
    const words = wordsRef.current.filter(Boolean);
    if (!image || words.length === 0) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Already played in this SPA session, or user prefers reduced motion: show final state
    if (hasHeroAnimated || reducedMotion) {
      hasHeroAnimated = true;
      gsap.set(image, { opacity: 1 });
      gsap.set(words, { opacity: 1, filter: "blur(0px)" });
      return;
    }

    let tl;

    const startHeroIntro = () => {
      if (hasHeroAnimated) return;

      tl = gsap.timeline({
        delay: 0.1,
        onComplete: () => {
          hasHeroAnimated = true;
        },
      });

      tl
        // Step 1: Smooth, slow fade-in of the doctor image
        .fromTo(
          image,
          { opacity: 0 },
          { opacity: 1, duration: 1.4, ease: "power2.out" }
        )
        // Step 2: Headline words resolve from blur to sharp, one after another
        .fromTo(
          words,
          { opacity: 0, filter: "blur(14px)" },
          {
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.6,
            stagger: 0.5,
            ease: "power2.out",
          },
          "-=0.5"
        );
    };

    if (isSplashPending()) {
      // Splash screen is playing: wait until its fade begins
      window.addEventListener("splashFadeStart", startHeroIntro, { once: true });

      // Safety timeout: reveal hero if splash event doesn't fire within 4s
      const fallbackTimer = setTimeout(startHeroIntro, 4000);

      return () => {
        window.removeEventListener("splashFadeStart", startHeroIntro);
        clearTimeout(fallbackTimer);
        if (tl) tl.kill();
      };
    } else {
      // Splash already ran or not pending: start intro immediately
      startHeroIntro();
      return () => {
        if (tl) tl.kill();
      };
    }
  }, []); // Run once on mount
};