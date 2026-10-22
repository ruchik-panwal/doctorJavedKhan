import Header from "@/components/Header";
import CircularText from "@/components/CircularText";
import GalleryNewSection from "@/components/gallery/GalleryNewSection";
import GalleryMobileSlider from "@/components/gallery/GalleryMobileSlider";
import SplitText from "@/components/SplitText";

export default function GalleryPage() {
  return (
    <main className="flex min-h-svh flex-col">
      {/* ── Fixed Header sits above everything ── */}
      <Header />

      {/* ── Hero / Intro ── full-viewport below header ── */}
      <section className="relative flex flex-1 flex-col items-center justify-center px-5 text-center min-h-svh">
        <SplitText
          tag="h1"
          className="font-tenor max-w-[660px] text-[clamp(1.25rem,3.3vw,2.5rem)] leading-[1.3]"
          effect="fade"
          splitType="chars"
          delay={30}
          duration={0.2}
          staggerFrom="start"
          trigger="view"
          textAlign="center"
          hoverEffect="lift"
        >
          We&apos;ve <span className="font-semibold">reimagined</span> dental
          care through thoughtful spaces, advanced treatments, and a calming,
          personalized <span className="font-semibold">experience.</span>
        </SplitText>

        <a
          href="#gallery-content"
          aria-label="Scroll down to the gallery"
          className="absolute bottom-0 translate-y-1 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
        >
          <CircularText
            text="* scroll down * scroll down "
            onHover="slowDown"
            direction="clockwise"
            spinDuration={40}
            size={100}
            fontSize={10}
            draggable
            hoverTilt={10}
            className="text-[#0b1b3a]"
            startAngle={5}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
            >
              <path
                d="M12 3v17m-7-7 7 7 7-7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.6"
              />
            </svg>
          </CircularText>
        </a>
      </section>

      {/* ── Desktop Gallery Section (md and above) ── */}
      <div className="hidden md:block">
        <GalleryNewSection />
      </div>

      {/* ── Mobile Gallery Slider (below md) ── */}
      <div className="block md:hidden">
        <GalleryMobileSlider />
      </div>
    </main>
  );
}
