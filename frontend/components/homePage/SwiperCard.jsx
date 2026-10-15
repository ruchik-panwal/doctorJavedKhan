import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";

// 1. ADDED onCardEnter and onCardLeave to props
export default function SwiperCard({
  url,
  hasDragged,
  onCardEnter,
  onCardLeave,
}) {
  const gradientRef = useRef(null);
  const textRef = useRef(null);
  const iconRef = useRef(null);

  const handleClick = (e) => {
    if (hasDragged.current) {
      e.preventDefault();
      return;
    }

    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleMouseEnter = () => {
    // 2. CALL the parent animation function
    if (onCardEnter) onCardEnter();

    gsap.to(gradientRef.current, {
      scaleY: 1.5,
      duration: 1,
      ease: "power.out",
    });
    gsap.to(textRef.current, {
      scale: 1.5,
      transformOrigin: "left bottom",
      duration: 0.7,
      ease: "power.out",
    });
    gsap.to(iconRef.current, { y: 0, duration: 1, ease: "power.out" });
  };

  const handleMouseLeave = () => {
    // 3. CALL the parent reset function
    if (onCardLeave) onCardLeave();

    gsap.to(gradientRef.current, {
      scaleY: 1,
      duration: 1,
      ease: "power2.out",
    });
    gsap.to(textRef.current, { scale: 1, duration: 0.7, ease: "power2.out" });
    gsap.to(iconRef.current, { y: -100, duration: 1, ease: "power2.out" });
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // Added cursor-none, removed onMouseMove (parent handles it now)
      className="relative overflow-hidden cursor-none flex-shrink-0 h-full w-[1000px] bg-cyan-700 rounded-2xl flex items-center justify-center text-white text-4xl"
    >
      <div
        ref={gradientRef}
        className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-black/[0.95] origin-bottom "
      ></div>

      <svg
        ref={iconRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="absolute top-8 right-8 z-30 w-12 h-12"
        style={{ transform: "translateY(-100px)" }}
      >
        <path d="M5 17.59L15.59 7H9V5h10v10h-2V8.41L6.41 19 5 17.59Z" />
      </svg>

      <div className="relative z-20 h-full w-full p-8 flex flex-col justify-end">
        <div className="flex justify-start items-center w-full">
          <p ref={textRef} className="stackClass text-5xl">
            NYU College Of Dentistry
          </p>
        </div>
      </div>

      <Image
        src="/testImages/img3.png"
        alt="About Image 2"
        fill
        className="object-cover z-0"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}
