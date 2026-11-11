import Image from "next/image";

export default function Clinic() {
  return (
    <>
      {/* First Section: Image on Right */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 md:px-24 md:py-32 min-h-[80vh] font-tenor tracking-[-12%] w-85/100">
        
        {/* Left Column: Text Content */}
        <div className="md:w-1/2 flex flex-col justify-center max-w-xl md:pr-10">
          <h2 className="text-3xl md:text-5xl font-normal text-gray-900 mb-4">
            World Class Dental Care in Kharghar
          </h2>
          
          <p className="text-gray-700 text-sm leading-4 mb-6 stackClass font-light">
            dr. khan is very precise in his work. i had extraction done and the
            procedure was completed quickly and with no discomfort or pain
            afterwards. im very impressed with how modern and high tech the office
            is and u can tell theyve invested in the latest technology which made
            the process very relaxing. everything was very systematic and
            organised. would recommend 100%.
          </p>
          
          <p className="text-gray-700 text-sm leading-4 stackClass font-light">
            dr. khan is very precise in his work. i had extraction done and the
            procedure was completed quickly and with no discomfort or pain
            afterwards. im very impressed with how modern and high tech the office
            is and u can tell theyve invested in the latest technology which made
            the process very relaxing. everything was very systematic and
            organised. would recommend 100%
          </p>
        </div>

        {/* Right Column: Image */}
        <div className="md:w-1/2 flex justify-center md:justify-end mt-5 md:mt-0 w-full">
          <div className="relative w-full max-w-lg aspect-square bg-gray-400">
            <Image
              src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Dental Clinic in Kharghar"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
        
      </section>

      {/* Second Section: Image on Left */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 md:px-24 md:py-32 min-h-screen font-tenor tracking-[-12%] w-85/100">
        
        {/* Left Column: Image */}
        <div className="md:w-1/2 flex justify-center md:justify-start mb-5 md:mb-0 md:pr-10 w-full order-last md:order-first">
          <div className="relative w-full max-w-lg aspect-square bg-gray-400">
            <Image
              src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Dental Clinic in Kharghar"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Right Column: Text Content */}
        <div className="md:w-1/2 flex flex-col justify-center max-w-xl md:pl-10 mt-5 md:mt-0">
          <h2 className="text-3xl md:text-5xl font-normal text-gray-900 mb-4">
            World Class Dental Care in Kharghar
          </h2>
          
          <p className="text-gray-700 text-sm leading-4 mb-6 stackClass font-light">
            dr. khan is very precise in his work. i had extraction done and the
            procedure was completed quickly and with no discomfort or pain
            afterwards. im very impressed with how modern and high tech the office
            is and u can tell theyve invested in the latest technology which made
            the process very relaxing. everything was very systematic and
            organised. would recommend 100%.
          </p>
          
          <p className="text-gray-700 text-sm leading-4 stackClass font-light">
            dr. khan is very precise in his work. i had extraction done and the
            procedure was completed quickly and with no discomfort or pain
            afterwards. im very impressed with how modern and high tech the office
            is and u can tell theyve invested in the latest technology which made
            the process very relaxing. everything was very systematic and
            organised. would recommend 100%
          </p>
        </div>
        
      </section>
    </>
  );
}