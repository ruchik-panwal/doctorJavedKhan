import Link from "next/link";

export function HeaderSpacer() {
  return (
    <div
      className="h-[59px] md:h-[63px] w-full shrink-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-3.5 w-full bg-background shrink-0">
      <Link
        href="/"
        className="tenorClass text-2xl md:text-3xl text-foreground hover:opacity-80 transition-opacity"
      >
        Javed Khan
      </Link>
      <nav className="stackClass font-light flex items-center gap-6 md:gap-10 text-lg md:text-xl text-foreground">
        <Link
          href="/royalDentalCare"
          className="hover:opacity-70 transition-opacity cursor-pointer"
        >
          Royal Dental Care
        </Link>
        <button className="hover:opacity-70 transition-opacity cursor-pointer">
          Our Team
        </button>
        <Link
          href="/gallery"
          className="hover:opacity-70 transition-opacity cursor-pointer"
        >
          Gallery
        </Link>
        <button className="hover:opacity-70 transition-opacity cursor-pointer">
          About
        </button>
      </nav>
    </header>
  );
}
