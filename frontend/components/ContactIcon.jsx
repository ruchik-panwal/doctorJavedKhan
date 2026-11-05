"use client";
import { useMagneticHover } from "./animations/contactIconAni"; // Adjust path as needed

export default function ContactIcon() {
  const { wrapperRef, outerRef, innerRef } = useMagneticHover();

  return (
    <a
      ref={wrapperRef}
      href="https://wa.me/YOUR_PHONE_NUMBER_HERE" // Replace with your WhatsApp number (e.g., 1234567890)
      target="_blank"
      rel="noopener noreferrer"
      // Added: fixed, bottom-8, right-8, and z-50 to pin it to the bottom right
      className="fixed bottom-8 right-8 z-50 flex w-9.5 h-9.5 items-center justify-center cursor-pointer"
    >
      {/* Outer border */}
      <div
        ref={outerRef}
        className="absolute inset-0 rounded-full border border-black will-change-transform"
      ></div>

      {/* Inner animated circle holding the SVG */}
      <div
        ref={innerRef}
        className="w-8 h-8 flex justify-center items-center rounded-full bg-black will-change-transform relative z-10"
      >
        <img 
          src="/icons/whatsappIconWhite.svg" 
          alt="WhatsApp" 
          className="w-5 h-5" 
        />
      </div>
    </a>
  );
}