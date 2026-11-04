import gsap from "gsap";

export const playEntranceAnimation = (textRefs, imgRefs) => {
  const validTextRefs = textRefs.filter(Boolean);
  const validImgRefs = imgRefs.filter(Boolean);

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(validTextRefs, {
    y: -28,
    opacity: 0,
    duration: 0.85,
    stagger: 0.08,
  }).from(
    validImgRefs,
    {
      clipPath: "inset(0 0 0 100%)",
      duration: 1.1,
      stagger: 0.07,
      ease: "power3.out",
    },
    "-=0.45"
  );

  return tl;
};

export const playSlideTransition = ({
  sectionEl,
  textRefs,
  direction,
  nextIndex,
  onHalfway,
  onComplete,
}) => {
  const currentImgs = sectionEl.querySelectorAll(".gallery-slide-curr");
  const nextImgs = sectionEl.querySelectorAll(".gallery-slide-next");
  const validTextRefs = textRefs.filter(Boolean);

  // Pre-position incoming images off-screen in direction of travel
  gsap.set(nextImgs, {
    xPercent: direction > 0 ? 100 : -100,
  });

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set(currentImgs, { xPercent: 0 });
      onComplete(nextIndex);
    },
  });

  // 1. Current text exits
  tl.to(validTextRefs, {
    y: direction > 0 ? 24 : -24,
    opacity: 0,
    duration: 0.35,
    stagger: 0.04,
    ease: "power2.inOut",
  });

  // 2. Synchronized image push: current moves aside while next enters
  tl.to(
    currentImgs,
    {
      xPercent: direction > 0 ? -100 : 100,
      duration: 0.85,
      stagger: 0.05,
      ease: "power3.inOut",
    },
    "-=0.15"
  ).to(
    nextImgs,
    {
      xPercent: 0,
      duration: 0.85,
      stagger: 0.05,
      ease: "power3.inOut",
    },
    "<"
  );

  // 3. Text content updates midway through slide and enters
  tl.add(() => {
    onHalfway(nextIndex);
  }, "-=0.45");

  tl.fromTo(
    validTextRefs,
    { y: direction > 0 ? -24 : 24, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.55,
      stagger: 0.05,
      ease: "power3.out",
    },
    "-=0.35"
  );

  return tl;
};