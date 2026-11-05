import HeroSection from "@/components/homePage/HeroSection";
import HomeAbout from "@/components/homePage/HomeAbout";
import StatsSection from "@/components/homePage/StatsSection";
import WallOfLove from "@/components/homePage/testimonial";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HomeAbout />
      <StatsSection />
      <WallOfLove />
    </main>
  );
}
