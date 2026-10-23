"use client";

import React from "react";
import Image from "next/image";
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type Testimonial = {
  id: number;
  name: string;
  handle: string;
  text: string;
  avatar: string;
  source: "google";
};

const topTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Pasquale Vitiello",
    handle: "@pasqualevitiello",
    text: "Dr. Khan is very precise in his work. I had extraction done and the procedure was completed quickly and with no discomfort or pain afterward.",
    avatar: "/testimonialImages/pfp1.jpg",
    source: "google",
  },
  {
    id: 2,
    name: "Anjana Ghatak",
    handle: "@anjanaghatak",
    text: "The dentist did an amazing job explaining my procedure and keeping me completely comfortable. My braces process has been smooth, and I highly recommend their skilled and gentle team.",
    avatar: "/testimonialImages/pfp2.jpg",
    source: "google",
  },
  {
    id: 3,
    name: "ALTAF SHAIK",
    handle: "@altafshaik",
    text: "I am truly grateful to Dr. Javed and the team at Royal Dental Care for their kindness and professionalism. Highly recommended for anyone looking for quality dental care.",
    avatar: "/testimonialImages/pfp1.jpg",
    source: "google",
  },
  {
    id: 4,
    name: "Arshed Patel",
    handle: "@arshedpatel",
    text: "Dr. Javed Sir is very professional and polite. He explained my dental issue clearly and the treatment was smooth and painless. Excellent service",
    avatar: "/testimonialImages/pfp2.jpg",
    source: "google",
  },
];

const bottomTestimonials: Testimonial[] = [
  {
    ...topTestimonials[2],
    id: 5,
  },
  {
    ...topTestimonials[3],
    id: 6,
  },
  {
    ...topTestimonials[0],
    id: 7,
  },
  {
    ...topTestimonials[1],
    id: 8,
  },
];

function GoogleIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      width="20"
      height="20"
      aria-label="Google"
      role="img"
    >
      <path
        fill="#4285F4"
        d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.9 6.1-15Z"
      />
      <path
        fill="#34A853"
        d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.6-5.1c-1.8 1.2-4 1.9-6.9 1.9-5.3 0-9.8-3.6-11.4-8.4H5.8v5.2A20 20 0 0 0 24 44Z"
      />
      <path
        fill="#FBBC05"
        d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.2H5.8a20 20 0 0 0 0 17.6l6.8-5.2Z"
      />
      <path
        fill="#EA4335"
        d="M24 12c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 5.9 29.5 4 24 4A20 20 0 0 0 5.8 15.2l6.8 5.2C14.2 15.6 18.7 12 24 12Z"
      />
    </svg>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="w-[325px] md:w-[390px] flex-none border border-[#b8b8af] rounded-xl p-4 md:p-5 bg-transparent flex flex-col justify-between min-h-[200px] md:min-h-[200px]">
      <p className="m-[0_0_18px] font-stack text-[9px] md:text-[13px] leading-[1.55] md:leading-[1.6] font-light wrap-words">
        {testimonial.text}
      </p>

      <div className="flex items-center justify-between gap-2 mt-auto">
        <div className="flex items-center gap-2 min-w-0">
          <Image
            className="w-[36px] h-9 flex-shrink-0 object-cover rounded-full bg-[#e0e0d8]"
            src={testimonial.avatar}
            alt="Profile Image"
            width={26}
            height={26}
            loading="lazy"
          />

          <div className="flex flex-col min-w-0 gap-[2px]">
            <span className="text-[11px] md:text-[14px] tenorClass leading-[1.2] font-semibold">
              {testimonial.name}
            </span>
            <span className=" tenorClasstext-[#77776f] text-[7px] md:text-[10px] leading-[1.2] overflow-hidden text-ellipsis whitespace-nowrap">
              {testimonial.handle}
            </span>
          </div>
        </div>

        <span className="flex shrink-0 items-center justify-center">
          <GoogleIcon />
        </span>
      </div>
    </article>
  );
}

type MarqueeRowProps = {
  testimonials: Testimonial[];
  direction: "left" | "right";
};

function MarqueeRow({ testimonials, direction }: MarqueeRowProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const firstSet =
        track?.querySelector<HTMLDivElement>("[data-marquee-set]");
      if (!track || !firstSet) return;

      let tween: gsap.core.Tween | undefined;
      const animate = () => {
        const setWidth = firstSet.getBoundingClientRect().width;
        if (!setWidth) return;

        tween?.kill();
        gsap.set(track, { x: direction === "right" ? -setWidth : 0 });
        tween = gsap.to(track, {
          x: direction === "left" ? -setWidth : 0,
          duration: setWidth / 80,
          ease: "none",
          repeat: -1,
        });
      };

      animate();
      const resizeObserver = new ResizeObserver(animate);
      resizeObserver.observe(firstSet);

      return () => {
        resizeObserver.disconnect();
        tween?.kill();
      };
    },
    { dependencies: [direction] },
  );

  return (
    <div className="relative w-full overflow-hidden">
      <div ref={trackRef} className=" mb-1 flex w-max will-change-transform">
        {/* Original row */}
        <div data-marquee-set className="flex gap-4 pr-4">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={`original-${testimonial.id}`}
              testimonial={testimonial}
            />
          ))}
        </div>

        {/* Cloned row (for seamless loop) */}
        <div className="flex gap-4 pr-4">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={`clone-${testimonial.id}`}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>

      {/* Gradient masks (unchanged) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-linear-to-r from-[#f3f3eb] via-[#f3f3eb]/75 to-transparent backdrop-blur-[2px] md:w-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-linear-to-l from-[#f3f3eb] via-[#f3f3eb]/75 to-transparent backdrop-blur-[2px] md:w-10"
      />
    </div>
  );
}

export default function WallOfLove() {
  return (
    <section className="w-full py-[54px] md:py-[64px] bg-[#f3f3eb] text-[#20201d]">
      <header className="text-center px-5 mb-9">
        <p className="m-[0_0_8px] text-[#77776f]  text-[10px] font-semibold tracking-[0.12em]">
          WALL OF LOVE
        </p>
        <h2 className="m-0 text-[clamp(23px,2.5vw,32px)] tenorClass uppercase leading-[1.2] tracking-[-0.045em] font-semibold">
          Here’s why our patients keep smiling
        </h2>
      </header>

      <div className="flex flex-col gap-6">
        <MarqueeRow testimonials={topTestimonials} direction="left" />
        <MarqueeRow testimonials={bottomTestimonials} direction="right" />
      </div>
    </section>
  );
}
