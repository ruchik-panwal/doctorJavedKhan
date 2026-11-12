import ScrollExpand from "./ScrollExpand";
import Header from "../Header";

export default function DentalHero() {
  return (
    <div className="bg-neutral-900 w-full relative">
      <ScrollExpand
        src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba"
        mediaType="image"
        startWidth={26}
        startHeight={43}
        startRadius={0}
        smoothing={0.09}
        useWindowScroll={true}
        title="Modern Dental Care" 
        header={<Header />} // <-- Pass the header here
      >
        <div className="flex flex-col items-center justify-center h-full w-full">
          <h1 className="text-white text-5xl font-bold drop-shadow-lg">
            Full Bleed Content
          </h1>
          <p className="text-white/80 mt-4 text-xl">
            This appears when scrolling is complete.
          </p>
        </div>
      </ScrollExpand>
    </div>
  );
}