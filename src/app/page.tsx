import { Hero } from "@/components/sections/hero";
import { Resume } from "@/components/sections/resume";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Certifications } from "@/components/sections/certifications";
import { Hackathons } from "@/components/sections/hackathons";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";
import { Separator } from "@/components/ui/separator";

function Divider() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <Separator />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Divider />
      <Resume />
      <Divider />
      <Experience />
      <Divider />
      <Projects />
      <Divider />
      <Skills />
      <Divider />
      <Certifications />
      <Hackathons />
      <Divider />
      <Education />
      <Divider />
      <Contact />
    </>
  );
}
