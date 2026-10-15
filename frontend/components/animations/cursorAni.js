import gsap from "gsap";

export const animateSwiperCard = (cursor, text) => {
  text.textContent = "DRAG";
  
  // Animate the container to show up without forming a background circle
  gsap.to(cursor, {
    width: "auto",
    height: "auto",
    backgroundColor: "transparent", // Ensures no circle is drawn
    opacity: 1,
    scale: 1,
    mixBlendMode: "difference", // Makes the text dynamically contrast with the background
    duration: 0.4,
    ease: "power2.out",
    overwrite: "auto",
  });
  
  // Show the text (white text + difference blend mode = always visible)
  gsap.to(text, { color: "white", opacity: 1, duration: 0.3, delay: 0.1, overwrite: "auto" });
};

export const resetSwiperCursor = (cursor, text) => {
  // Fade out and slightly shrink instead of collapsing to 0 width/height
  gsap.to(cursor, {
    opacity: 0,
    scale: 0.5,
    duration: 0.4,
    ease: "power2.out",
    overwrite: "auto",
  });
  
  gsap.to(text, { opacity: 0, duration: 0.2, overwrite: "auto" });
};