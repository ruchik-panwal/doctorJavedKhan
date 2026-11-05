import Header from "@/components/Header";
import Heading from "@/components/teamPage/Heading";
import TeamContainer from "@/components/teamPage/TeamContainer";

export default function Team() {
  return (
    <div className="h-screen w-full flex flex-col items-center gap-10 box-border">
      <Header />
      <div className="h-full w-full px-8 flex flex-col gap-10">
        <Heading />
        <TeamContainer />
      </div>
    </div>
  );
}
