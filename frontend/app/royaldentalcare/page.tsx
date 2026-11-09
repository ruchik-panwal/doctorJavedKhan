import Header from "@/components/Header";
import Clinic from "@/components/royalDentalPage/Clinic"
import Treatement from "@/components/royalDentalPage/Treatement"

export default function RoyalDentalCare() {
  return (
    <div className="h-screen w-full flex flex-col items-center">
        <Header />
        <Clinic />  
        <Treatement />
    </div>
  );
}


