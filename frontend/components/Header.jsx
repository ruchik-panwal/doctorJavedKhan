import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between items-center border-b border-borderColor p-1 px-2 w-full">
      <div className="tenorClass text-4xl">Dr. Javed Khan</div>
      <nav className="stackClass font-light flex justify-between items-center gap-9 text-2xl">
        <button>Royal Dental Care</button>
        <Link href="/gallery" className="cursor-pointer">Gallery</Link>
        <button>Our Team</button>
        <button>About</button>
      </nav>
    </div>
  );
}
