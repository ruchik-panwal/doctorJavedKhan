import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Entrance Animation Hook
export const useGalleryEntrance = (refs) => {
  useGSAP(() => {
    const {
      titleRef,
      leftTitleRef,
      descRef,
      img1Ref,
      img2Ref,
      img3Ref,
      img4Ref,
      img5Ref,
    } = refs;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(
      [titleRef.current, leftTitleRef.current, descRef.current].filter(Boolean),
      {
        y: -28,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
      }
    ).from(
      [
        img1Ref.current,
        img2Ref.current,
        img3Ref.current,
        img4Ref.current,
        img5Ref.current,
      ].filter(Boolean),
      {
        clipPath: "inset(0 0 0 100%)",
        duration: 1.1,
        stagger: 0.07,
        ease: "power3.out",
      },
      "-=0.45"
    );
  }, []);
};

// Slide Transition Animation Hook
export const useGalleryTransition = ({
  nextIndex,
  direction,
  sectionRef,
  titleRef,
  leftTitleRef,
  descRef,
  onMidway,
  onComplete,
}) => {
  useGSAP(
    () => {
      if (nextIndex === null || !sectionRef.current) return;

      const currentImgs = sectionRef.current.querySelectorAll(
        ".gallery-slide-curr"
      );
      const nextImgs = sectionRef.current.querySelectorAll(
        ".gallery-slide-next"
      );

      const textEls = [
        titleRef.current,
        leftTitleRef.current,
        descRef.current,
      ].filter(Boolean);

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
      tl.to(textEls, {
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
        onMidway(nextIndex);
      }, "-=0.45");

      tl.fromTo(
        textEls,
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
    },
    { dependencies: [nextIndex], scope: sectionRef }
  );
};