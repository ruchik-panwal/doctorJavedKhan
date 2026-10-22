import Image from "next/image";

export default function HeroAbout({ aboutRef, blueDivRef, amberDivRef }) {
  return (
    <div
      ref={aboutRef}
      className="hero-about absolute top-0 left-0 flex justify-between items-center h-screen w-screen bg-background"
    >
      <div className="flex flex-col gap-20 tenorClass text-7xl h-full w-full p-20">
        <div>About Me</div>
        {/* REMOVED: transform-gpu */}
        {/* APPLIED: h-[500px] w-[300px] */}
        <div
          ref={blueDivRef}
          className="relative h-[500px] w-[300px] overflow-hidden"
        >
          <Image 
            src="/testImages/portraitImg.png" 
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
        {/* APPLIED: h-[240px] w-[800px] */}
        <div className="mt-20 h-[240px] w-[800px] flex">
          {/* APPLIED: w-[400px] */}
          <div className="p-1 font-stack text-[0.8rem] w-[400px] font-extralight">
            OVERVIEW
          </div>
          <div className="tenorClass text-3xl text-black/70">
            For over half a century, HBA has been a leading voice in the world
            of hospitality and design. Today, we are a dynamic and
            multidisciplinary creative collective, bringing decades of
            experience to bear across specialisms, markets and industries.
          </div>
        </div>
        
        {/* REMOVED: transform-gpu */}
        {/* APPLIED: h-[400px] w-[800px] */}
        <div
          ref={amberDivRef}
          className="relative mt-20 h-[400px] w-[800px] overflow-hidden"
        >
          <Image 
            src="/testImages/landscapeImg.png" 
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