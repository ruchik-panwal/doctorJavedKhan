export default function Header() {
  return (
    <div className="flex justify-between items-center border-b border-borderColor px-2 w-full">
      <div className="tenorClass text-[1.5rem]">Dr. Javed Khan</div>
      <div className="stackClass font-light flex justify-between items-center gap-5 text-[1.1rem]">
        <button>Royal Dental Care</button>
        <button>Our Team</button>
        <button>About</button>
      </div>
    </div>
  );
}
