import type { Metadata } from "next";
import FeaturesPage from "@/components/featuresPage/FeaturesPage";

export const metadata: Metadata = {
  title: "Features & Appearances | Dr. Javed Khan",
  description:
    "Media appearances, press features, and public engagements by Dr. Javed Khan of Royal Dental Care.",
};

export default function FeaturesRoute() {
  return (
    <main className="min-h-screen w-full bg-[#1A1A1A]">
      <FeaturesPage />
    </main>
  );
}
