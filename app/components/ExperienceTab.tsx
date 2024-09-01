import { Card } from "@/components/ui/card";
import me from "../../public/vivek.jpg";
import Image from "next/image";
import Experience from "./experience/Experience";
export function ExperienceTab() {
  return (
    <div className=" gap-4 mt-10">
      <Card className="  border-none bg-gray-100 p-8">
        <h1 className="font-bold text-3xl">Experience</h1>
      <Experience/>
      </Card>
    </div>
  );
}
