import Header from "@/components/Header";
import DentalHero from "@/components/royalDentalPage/DentalHero"
import Clinic from "@/components/royalDentalPage/Clinic"
import Treatement from "@/components/royalDentalPage/Treatement"

export default function RoyalDentalCare() {
  return (
    <div className=" w-full flex flex-col items-center">
        <Header />
        <DentalHero />
        <Clinic />
        <Treatement />
    </div>
  );
}


