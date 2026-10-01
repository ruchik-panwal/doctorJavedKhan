import Image from "next/image";
import Header from "../Header";

export default function HeroSection() {
  return (
    <div className="flex flex-col justify-between items-center h-screen w-screen border-b border-borderColor">
      <Header />
    </div>
  );
}
