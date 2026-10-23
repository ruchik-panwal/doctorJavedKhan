import React from 'react';

const StatsSection = () => {
  const stats = [
    { value: '300', label: 'Happy patients' },
    { value: '70', label: 'Reviews' },
    { value: "2", label: "Clinic's" },
  ];

  return (
    <section className="min-h-screen w-full flex items-center justify-center p-6 md:p-12 lg:p-20 tenorClass text-black">
      {/* Container for the stats with a max-width */}
      <div className="w-full max-w-6xl border-b border-black">
        {/* Map through the stats array to generate rows */}
        {stats.map((stat, index) => (
          <div
            key={index}
            className="border-t border-black flex flex-row items-center justify-between py-10 md:py-14 lg:py-16 px-6 md:px-16 lg:px-24"
          >
            {/* Number Section (Left side with inset) */}
            <div className="flex items-center justify-start">
              <span className="text-7xl md:text-9xl lg:text-[115px] leading-none tracking-tight">
                {stat.value}
              </span>
            </div>

            {/* Label Section (Right side, centered relative to each other) */}
            <div className="w-36 md:w-48 lg:w-56 text-center">
              <p className="text-base md:text-2xl lg:text-3xl font-light tracking-tight">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
