import Image from "next/image";
import Link from "next/link";

export default function FeaturesSection() {
  return (
    <section className="grid min-h-svh w-full grid-cols-1 items-stretch bg-background text-foreground md:grid-cols-[1.07fr_0.93fr]">
      <div className="flex min-h-[55svh] flex-col justify-between px-6 py-10 sm:px-10 sm:py-12 md:min-h-svh md:px-12 md:py-[12vh] lg:px-[5.7vw]">
        <h2 className="m-0 font-tenor text-[clamp(3.5rem,7.6vw,5.75rem)] leading-[0.86] tracking-[-0.06em] text-[#11152c]">
          Features &amp;
          <br />
          Appearances
        </h2>

        <div className="mt-12 font-stack text-[0.9rem] leading-[1.3] sm:mt-1 md:mt-0">
          <p className="mb-2 max-w-56">
            Lorem ipsum is a standard placeholder text used globally in graphic
            design,
          </p>
          <Link
            href="/features"
            className="inline-block cursor-pointer rounded-full border border-foreground px-3 py-0.5 font-stack text-base leading-tight hover:opacity-70 transition-opacity"
          >
            More
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 pb-12 sm:px-10 md:justify-end md:py-10 md:pr-[5.7vw] md:pl-0">
        <figure className="m-0 w-full max-w-[42rem]">
          <div className="relative aspect-[5/3] w-full overflow-hidden rounded-xl">
            <Image
              src="/features/radio-city-interview.jpg"
              alt="Dr. Javed Khan speaking about dentistry on Radio City 91.1 FM"
              fill
              className="object-cover"
              sizes="(max-width: 767px) calc(100vw - 3rem), 41vw"
            />
          </div>
          <figcaption className="mt-2 text-right">
            <h3 className="m-0 font-stack text-[clamp(1.9rem,4vw,3rem)] font-bold leading-tight tracking-tight text-black">
              @Radio City 91.1 FM
            </h3>
            <p className="m-0 font-stack text-[clamp(1.25rem,2.6vw,2.05rem)] font-semibold leading-tight text-[#737168]">
              Talk on Dentistry
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
