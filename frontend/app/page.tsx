import HeroSection from "@/components/homePage/HeroSection";
import WorkAndApp from "@/components/homePage/WorkAndApp";
import WallOfLove from "@/components/testimonial/testimonial";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <WorkAndApp />
      <WallOfLove />
    </div>
  );
}
