import ScrollExpand from "./ScrollExpand"; // Adjust the import path as per your setup

export default function HeroSection() {
  return (
    // A tall container is required so there's enough space to scroll and trigger the expansion
    <div className="h-[100vh] bg-neutral-900 w-full relative">
      
      <ScrollExpand
        src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba" // Replace with your image/video URL
        mediaType="image" // Change to "video" if using a video source
        startWidth={26}
        startHeight={43}
        startRadius={0}
        smoothing={0.09}
      >
        {/* Children fade in automatically once the media reaches full screen */}
        <div className="flex items-center justify-center h-full w-full">
          <h1 className="text-white text-5xl font-bold">
            Full Bleed Content
          </h1>
        </div>
      </ScrollExpand>

    </div>
  );
}