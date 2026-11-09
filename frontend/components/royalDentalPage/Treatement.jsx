"use client";

import { useState } from "react";
import Image from "next/image";
import { treatmentsData } from "./treatmentsData";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll"; // Adjust path as needed

export default function Treatement() {
  const [activeImage, setActiveImage] = useState(treatmentsData[0].image);

  return (
    <div className="min-h-screen w-full bg-[#f3efe8] p-4 md:p-10 lg:p-20 flex flex-col relative">
      <div className="w-full font-tenor tracking-[-10%] font-regular text-4xl md:text-5xl lg:text-[5rem] mb-6 md:mb-10 text-center md:text-left">
        Our Treatments
      </div>
      
      {/* Visual hint for mobile safe-zone scrolling */}
      <div className="md:hidden absolute left-2 top-1/2 bottom-0 w-8 flex items-center justify-center pointer-events-none text-gray-400 text-xs text-center opacity-50 font-sans [writing-mode:vertical-lr] rotate-180">
      </div>

      <div className="flex-1 flex flex-col md:flex-row w-full h-full gap-6 md:gap-10">
        <ImageHolder src={activeImage} />
        
        <MomentumList
          items={treatmentsData}
          onChange={(index, item) => setActiveImage(item.image)}
          visibleItems={9}
          textColor="#9ca3af" // text-gray-400
          activeColor="#000000" // text-black
          className="w-[85%] ml-auto md:w-3/5 h-[40vh] md:h-[60vh] lg:h-[70vh] border-y border-black/20"
        />
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Sleek Vertical Momentum List UI Component
// ----------------------------------------------------------------------
const MomentumList = ({
  items = [],
  defaultSelected = 0,
  onChange,
  textColor = "#a6a6a6",
  activeColor = "#ffffff",
  smoothing = 200,
  loop = true,
  className = "",
  visibleItems = 9, 
}) => {
  // Pull all the logic from our custom hook
  const {
    rootRef,
    itemRefs,
    selectedIndex,
    isDragging,
    renderItems,
    handleItemClick,
    events,
  } = useInfiniteScroll({
    items,
    defaultSelected,
    onChange,
    smoothing,
    loop,
    visibleItems,
  });

  return (
    <div
      ref={rootRef}
      role="listbox"
      className={`relative select-none overflow-hidden outline-none touch-none ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      } ${className}`}
      style={{
        "--ow-text-color": textColor,
        "--ow-active-color": activeColor,
      }}
      {...events}
    >
      {renderItems.map((item, index) => (
        <div
          key={`${item.title}-${index}`}
          ref={(el) => { itemRefs.current[index] = el; }}
          role="option"
          aria-selected={selectedIndex === index}
          className={`absolute top-1/2 right-0 w-full flex flex-col justify-center px-2 md:px-5 border-b border-black text-[1.25rem] md:text-[2rem] lg:text-[3rem] text-right cursor-pointer will-change-transform ${
            selectedIndex === index ? "font-medium" : "font-extralight"
          }`}
          style={{
            color: `color-mix(in srgb, var(--ow-active-color) calc(var(--ow-p, 0) * 100%), var(--ow-text-color))`
          }}
          onClick={() => handleItemClick(index)}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};

// ----------------------------------------------------------------------
// ImageHolder 
// ----------------------------------------------------------------------
function ImageHolder({ src }) {
  return (
    <div className="w-full md:w-2/5 flex items-center justify-center p-0 sm:p-6 md:p-10">
      {/* 
        Removed h-full from the parent. 
        Added scaled max-width constraints (350px on mobile, 450px on small tablets, full width on desktop) 
        so the aspect-square scales perfectly without blowing out the screen.
      */}
      <div className="relative w-full max-w-[350px] sm:max-w-[450px] md:max-w-full aspect-square overflow-hidden">
        <Image
          src={src}
          alt="Dental Treatment"
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 40vw"
          priority
        />
      </div>
    </div>
  );
}