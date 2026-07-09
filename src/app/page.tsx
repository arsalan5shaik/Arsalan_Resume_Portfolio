import { Hero } from "@/components/sections/hero";
import { Resume } from "@/components/sections/resume";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Certifications } from "@/components/sections/certifications";
import { Events } from "@/components/sections/events";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";

function Divider() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
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
      <Events />
      <Divider />
      <Education />
      <Divider />
      <Contact />
    </>
  );
}
