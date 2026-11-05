import gsap from "gsap";

// Module-level flag: prevents re-playing the hero intro during SPA route changes
export const heroState = {
  hasAnimated: false,
};

/**
 * Instantly applies the final styles (used for reduced motion or subsequent visits)
 */
export const setHeroFinalState = (image, words) => {
  gsap.set(image, { opacity: 1 });
  gsap.set(words, { opacity: 1, filter: "blur(0px)" });
};

/**
 * Plays the initial fade-in and blur-reveal animation
 */
export const playHeroIntro = (image, words, onComplete) => {
  const tl = gsap.timeline({
    delay: 0.1,
    onComplete: onComplete,
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

  return tl;
};