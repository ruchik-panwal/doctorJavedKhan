import HeroSection from "@/components/homePage/HeroSection";
import HomeAbout from "@/components/homePage/HomeAbout";
import QuoteSection from "@/components/homePage/QuoteSection";
import FeaturesSection from "@/components/homePage/FeaturesSection";
import WallOfLove from "@/components/homePage/testimonial";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HomeAbout />
      {/* <StatsSection /> */}
      <QuoteSection />
      <FeaturesSection />
      <WallOfLove />
    </main>
  );
}
