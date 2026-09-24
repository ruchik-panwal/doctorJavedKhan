import Header from "../Header";

export default function HeroSection() {
  return (
    <div className="flex flex-col justify-between items-center h-screen w-screen">
      <Header />
      <div className="h-full w-full flex justify-between items-center bg-amber-300">
        <div className="flex-2/3 h-full w-full border-r border-borderColor bg-blue-400"></div>
        <div className="flex-1/3 h-full w-full flex flex-col">
          <div>
            <h1 className="tenorClass text-[150px] leading-[80%] text-right">
              Dr. Javed Khan
            </h1>
            <h3 className="font-stack text-right text-2xl">Dentist</h3>
          </div>
          <button className="text-right underline font-bold">
            SCHEDULE AN APPOINTMENT
          </button>
        </div>
      </div>
    </div>
  );
}
