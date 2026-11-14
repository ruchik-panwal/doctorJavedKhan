import Image from "next/image";
import Link from "next/link";

const SECTION_DATA = {
  title: "Features &\nAppearances",
  description: "Lorem ipsum is a standard placeholder text used globally in graphic design,",
  link: { text: "More", href: "/features" },
  featuredEvent: {
    title: "@Radio City 91.1 FM",
    subtitle: "Talk on Dentistry",
    image: {
      src: "/features/radio-city-interview.jpg",
      alt: "Dr. Javed Khan speaking about dentistry on Radio City 91.1 FM",
    },
  },
};

export default function FeaturesSection() {
  return (
    <section className="relative flex w-full flex-col items-center justify-center gap-10 bg-background px-6 py-12 text-foreground md:flex-row md:items-stretch md:px-30 md:py-20 lg:gap-20">
      
      {/* 
        Left Column: 'contents' ungroups children on mobile so we can reorder them. 
        'md:flex' groups them back into a single left column on desktop. 
      */}
      <div className="contents md:flex md:w-full md:flex-1 md:flex-col md:justify-between md:gap-10 md:py-4">
        
        {/* 1. Title (Top on mobile) */}
        <h2 className="order-1 m-0 whitespace-pre-line text-center font-tenor text-[clamp(3.5rem,7.6vw,5.75rem)] leading-[0.86] tracking-tight text-[#11152c] md:text-left">
          {SECTION_DATA.title}
        </h2>

        {/* 3. Para & Link (Bottom on mobile) */}
        <div className="order-3 flex flex-col items-center text-center font-stack text-sm leading-relaxed md:items-start md:text-left">
          <p className="mb-3 max-w-[14rem]">
            {SECTION_DATA.description}
          </p>
          <Link
            href={SECTION_DATA.link.href}
            className="inline-block rounded-full border border-foreground px-4 py-1 font-stack text-base leading-tight transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2"
          >
            {SECTION_DATA.link.text}
          </Link>
        </div>

      </div>

      {/* 2. Right Column / Featured Image (Middle on mobile) */}
      <div className="order-2 flex w-full flex-1 items-center justify-center md:justify-end">
        <figure className="m-0 w-full text-center md:text-right">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
            <Image
              src={SECTION_DATA.featuredEvent.image.src}
              alt={SECTION_DATA.featuredEvent.image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 767px) calc(100vw - 3rem), 41vw"
              priority={false} 
            />
          </div>
          
          <figcaption className="mt-3">
            <h3 className="m-0 font-stack text-[clamp(1.9rem,4vw,2rem)] font-bold leading-tight tracking-tight text-black">
              {SECTION_DATA.featuredEvent.title}
            </h3>
            <p className="m-0 font-stack text-[clamp(1.25rem,2.6vw,1rem)] font-semibold leading-tight text-[#737168]">
              {SECTION_DATA.featuredEvent.subtitle}
            </p>
          </figcaption>
        </figure>
      </div>
      
    </section>
  );
}