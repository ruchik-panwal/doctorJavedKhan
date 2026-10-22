import Image from "next/image";

// Accept the refs passed down from the parent HeroSection
export default function HeroAbout({ aboutRef, blueDivRef, amberDivRef }) {
  return (
    <div
      ref={aboutRef}
      className="hero-about absolute top-0 left-0 flex justify-between items-center h-screen w-screen bg-background"
    >
      <div className="flex flex-col gap-20 tenorClass text-7xl h-full w-full p-20">
        <div>About Me</div>
        {/* Fixed Tailwind: h-200 -> h-[500px], w-150 -> w-[300px] */}
        {/* Added 'relative' and 'overflow-hidden' for Next Image, removed bg-blue-600 */}
        <div
          ref={blueDivRef}
          className="relative h-175 w-150 transform-gpu overflow-hidden"
        >
          <Image 
            src="/testImages/portraitImg.png" // TODO: Replace with your actual file name
            alt="About Image 1"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="eager"
            priority
          />
        </div>
      </div>

      <div className="flex flex-col gap-40 h-full w-full">
        {/* Fixed Tailwind: h-60, w-200 -> h-[240px] w-[800px] */}
        <div className="mt-20 h-60 w-200 flex">
          {/* Fixed Tailwind: w-120 -> w-[400px] */}
          <div className="p-1 font-stack text-[0.8rem] w-100 font-extralight">
            OVERVIEW
          </div>
          <div className="tenorClass text-3xl text-black/70">
            For over half a century, HBA has been a leading voice in the world
            of hospitality and design. Today, we are a dynamic and
            multidisciplinary creative collective, bringing decades of
            experience to bear across specialisms, markets and industries.
          </div>
        </div>
        {/* Fixed Tailwind: h-120, w-200 -> h-[400px] w-[800px] */}
        {/* Added 'relative' and 'overflow-hidden' for Next Image, removed bg-amber-400 */}
        <div
          ref={amberDivRef}
          className="relative mt-20 h-100 w-200 transform-gpu overflow-hidden"
        >
          <Image 
            src="/testImages/landscapeImg.png" // TODO: Replace with your actual file name
            alt="About Image 2"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}