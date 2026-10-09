export default function Header() {
  return (
    <div className="flex justify-between items-center border-b border-borderColor p-1 px-2 w-full">
      <div className="tenorClass text-4xl">Dr. Javed Khan</div>
      <div className="stackClass font-light flex justify-between items-center gap-9 text-2xl">
        <button>Royal Dental Care</button>
        <button>Our Team</button>
        <button>About</button>
      </div>
    </div>
  );
}
