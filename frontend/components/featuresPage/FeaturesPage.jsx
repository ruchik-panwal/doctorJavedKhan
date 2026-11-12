"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ═══════════════════════════════════════════════════════════════
   TWEAKABLE CONSTANTS — edit these without touching any logic
   ═══════════════════════════════════════════════════════════════ */

/** Two heading lines — edit spelling here */
const HEADING_LINES = ["Features &", "Appearances"];

/** Image size bucket → Tailwind class for image block width on desktop.
 *  Write full class strings so Tailwind can detect them statically. */
const SIZE_CLASSES = {
  md: "md:w-[62%]",
  lg: "md:w-[70%]",
};

/** Accent underline colour */
const UNDERLINE_COLOR = "#1E7FE0";

/** All feature items. Swap src / description / location when real content arrives. */
const FEATURES = [
  {
    id: 1,
    src: "/features/radio-city-interview.jpg",
    alt: "Dr. Javed Khan on Radio City 91.1 FM",
    width: 1000,
    height: 785,
    size: "lg",
    description:
      "Dr. Javed Khan joined Radio City 91.1 FM for a candid conversation on modern dentistry, patient comfort, and the future of aesthetic dental care in India.",
    location: "Radio City 91.1 FM, Mumbai",
  },
  {
    id: 2,
    src: "/galleryImages/image1.jpg",
    alt: "Clinic interior feature",
    width: 1000,
    height: 530,
    size: "md",
    description:
      "Royal Dental Care's state-of-the-art operatories were featured in a leading healthcare design publication for their integration of technology and patient wellness.",
    location: "Healthcare Design Quarterly",
  },
  {
    id: 3,
    src: "/galleryImages/image2.jpg",
    alt: "Dr. Javed Khan panel discussion",
    width: 1000,
    height: 1077,
    size: "lg",
    description:
      "Invited as a keynote panellist to discuss advances in smile design and digital impression systems at the annual national dental conference.",
    location: "IDA Annual Conference, Delhi",
  },
  {
    id: 4,
    src: "/galleryImages/image3.jpg",
    alt: "Magazine feature spread",
    width: 1000,
    height: 785,
    size: "md",
    description:
      "A full-page feature in a lifestyle magazine explored Dr. Khan's philosophy of pain-free dentistry and the importance of preventive oral health routines.",
    location: "Lifestyle Today Magazine",
  },
  {
    id: 5,
    src: "/galleryImages/image4.jpg",
    alt: "Television segment",
    width: 1000,
    height: 530,
    size: "lg",
    description:
      "Appeared on a morning television segment to bust common dental myths and offer live demonstrations of modern teeth-whitening techniques.",
    location: "Zee News Morning Show",
  },
  {
    id: 6,
    src: "/galleryImages/image5.jpg",
    alt: "Community dental camp",
    width: 1000,
    height: 1077,
    size: "md",
    description:
      "Organised and led a free community dental camp serving over 400 residents, featured in regional press for its outreach impact.",
    location: "Kharghar Community Centre, Navi Mumbai",
  },
];

/* ═══════════════════════════════════════════════════════════════
   REUSABLE FEATURE ITEM COMPONENT
   ═══════════════════════════════════════════════════════════════ */

function FeatureItem({ item, index }) {
  const isLeft = index % 2 === 0;
  const imageSizeClass = SIZE_CLASSES[item.size] ?? SIZE_CLASSES.md;

  /* ── Grid column placement: LEFT vs RIGHT ─────────────────────
     LEFT  (even): cols 2–8  (shifted left of centre)
     RIGHT (odd):  cols 5–12 (shifted right of centre)           */
  const colClass = isLeft
    ? "md:col-start-2 md:col-span-7"
    : "md:col-start-5 md:col-span-8";

  return (
    <article
      className={`col-span-12 ${colClass} min-w-0`}
      /* data-feature-item used by GSAP to scope child selectors */
      data-feature-item
    >
      {/* ── Mobile layout: flex-col ──────────────────────────── */}
      {/* ── Desktop layout: flex-row, image left, desc right ─── */}
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-start md:gap-[1.6vw]">

        {/* ── Image block (image + location label below) ──────── */}
        <div className={`w-full ${imageSizeClass} shrink-0 min-w-0`}>
          {/* Image wrapper — grey bg shows if image is missing */}
          <div className="relative w-full overflow-hidden bg-[#D9D9D9]">
            <Image
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              className="w-full h-auto block"
              sizes="(max-width: 767px) 100vw, 60vw"
              data-feature-image
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          {/* Location label — right-aligned under the image */}
          <p
            className="mt-2 text-right stackClass text-[clamp(0.6875rem,0.9vw,0.75rem)] leading-tight text-white/80"
            data-feature-location
          >
            {item.location}
          </p>
        </div>

        {/* ── Description — right of image, left-aligned ───────
             On mobile it renders below (flex-col reverses DOM).  */}
        <p
          className="
            flex-1 min-w-0
            stackClass
            text-[clamp(0.75rem,1vw,0.8125rem)]
            leading-[1.35]
            text-white/90
            text-left
            md:pt-0.5
          "
          data-feature-desc
        >
          {item.description}
        </p>

      </div>
    </article>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function FeaturesPage() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      /* ── Respect prefers-reduced-motion ─────────────────────── */
      const mm = gsap.matchMedia();

      mm.add(
        {
          /* When user has NO reduced-motion preference */
          isMotion: "(prefers-reduced-motion: no-preference)",
          /* When user DOES prefer reduced motion */
          isReduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isMotion } = context.conditions;

          const items = containerRef.current?.querySelectorAll(
            "[data-feature-item]"
          );
          if (!items) return;

          items.forEach((item) => {
            const img = item.querySelector("[data-feature-image]");
            const desc = item.querySelector("[data-feature-desc]");
            const loc = item.querySelector("[data-feature-location]");

            if (!isMotion) {
              /* Reduced motion: show everything immediately */
              if (img) gsap.set(img, { opacity: 1, y: 0 });
              if (desc) gsap.set(desc, { opacity: 1, y: 0 });
              if (loc) gsap.set(loc, { opacity: 1 });
              return;
            }

            /* ── Full animation ─────────────────────────────── */
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: item,
                start: "top 85%",   // ← animation trigger position (tweakable)
                once: true,
              },
            });

            if (img) {
              tl.fromTo(
                img,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" },  // ← image reveal (tweakable)
                0
              );
            }

            if (desc) {
              tl.fromTo(
                desc,
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" },  // ← desc reveal (tweakable)
                0.15                                                       // ← stagger after image
              );
            }

            if (loc) {
              tl.fromTo(
                loc,
                { opacity: 0 },
                { opacity: 1, duration: 0.7, ease: "power2.out" },      // ← location fade (tweakable)
                0.3                                                        // ← stagger after image
              );
            }
          });
        }
      );

      /* ── Refresh ScrollTrigger once all assets have loaded ─── */
      const handleLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-x-hidden bg-[#1A1A1A] text-white px-5 md:px-[3.5vw] pb-24 md:pb-40"
    >
      {/* ════════════════════════════════════════════════════════
          HEADING — top left, two lines each with blue underline
          ════════════════════════════════════════════════════════ */}
      <div className="pt-16 md:pt-24">
        <h1 className="tenorClass m-0 leading-none tracking-[-0.03em] text-[clamp(2.5rem,6vw,5rem)] font-light">
          {HEADING_LINES.map((line) => (
            <span key={line} className="block">
              <span
                className="inline-block"
                style={{ borderBottom: `4px solid ${UNDERLINE_COLOR}`, paddingBottom: "2px" }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>
      </div>

      {/* ════════════════════════════════════════════════════════
          FEATURES GRID
          12-column grid on desktop; single-column stacked on mobile.
          gap-y controls vertical space between items (tweakable).
          ════════════════════════════════════════════════════════ */}
      <div className="mt-20 md:mt-40 grid grid-cols-12 gap-y-20 md:gap-y-32 lg:gap-y-40">
        {FEATURES.map((item, index) => (
          <FeatureItem key={item.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}

