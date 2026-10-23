import HeroSection from "@/components/homePage/HeroSection";
import HeroAbout from "@/components/homePage/HeroAbout";
import WorkAndApp from "@/components/homePage/WorkAndApp";
import StatsSection from "@/components/homePage/StatsSection";
import WallOfLove from "@/components/testimonial/testimonial";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HeroAbout />
      <WorkAndApp />
      <StatsSection />
      <WallOfLove />
    </main>
  );
}
