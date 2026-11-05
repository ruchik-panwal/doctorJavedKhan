import Image from "next/image";

export const teamData = [
  {
    role: "Founder",
    members: [
      {
        name: "Dr. Ananya Sharma",
        qualification: "BDS, MDS (Orthodontics)",
        image:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    role: "General Dentistry",
    members: [
      {
        name: "Dr. Priya Patel",
        qualification: "BDS, Cosmetic Dentistry",
        image:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
      },
      {
        name: "Dr. Rahul Verma",
        qualification: "BDS, MDS (Endodontics)",
        image:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500&q=80",
      },
      {
        name: "Dr. Amit Desai",
        qualification: "BDS",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
  {
    role: "Patient Care & Support",
    members: [
      {
        name: "Sneha Reddy",
        qualification: "Clinic Manager",
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
      },
      {
        name: "Vikram Singh",
        qualification: "Certified Dental Assistant",
        image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80",
      },
      {
        name: "Kavita Nair",
        qualification: "Registered Dental Hygienist",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
      },
      {
        name: "Meera Joshi",
        qualification: "Patient Coordinator",
        image:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80",
      },
      {
        name: "Rohan Kapoor",
        qualification: "Dental Technician",
        image:
          "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=500&q=80",
      },
    ],
  },
];

export default function TeamContainer() {
  return (
    <div className="flex flex-col">
      {teamData.map((team) => (
        <div
          key={team.role}
          // Removed bg-amber-400
          className="w-full min-h-50 flex flex-col md:flex-row items-start justify-between p-5 py-10 gap-5 border-b"
        >
          {/* Removed bg-amber-500 */}
          <div className="font-tenor tracking-[-10%] text-[2rem] w-full md:w-60 shrink-0 leading-7">
            {team.role}
          </div>
          <ImageWrapper members={team.members} />
        </div>
      ))}
    </div>
  );
}

function ImageWrapper({ members }) {
  return (
    // Removed bg-sky-400
    <div className="flex-1 min-w-0 grid grid-cols-2 md:grid-cols-3 gap-8">
      {members.map((member) => (
        <div key={member.name} className="flex flex-col w-full">
          <Image
            src={member.image}
            alt={member.name}
            width={500}
            height={500}
            className="w-full aspect-square object-cover object-center"
            sizes="(max-width: 768px) 50vw, 33vw"
          />
          <div className="flex flex-col mt-3 font-tenor tracking-[-5%]">
            <div className="font-bold text-[1.3rem] leading-tight">{member.name}</div>
            <div className="text-sm stackClass font-light text-gray-500">{member.qualification}</div>
          </div>
        </div>
      ))}
    </div>
  );
}