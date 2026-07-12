import { projects } from "@/lib/data/projects";
import { imageExists } from "@/lib/image-exists";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCarousel } from "@/components/sections/project-carousel";

export function Projects() {
  const items = projects.map((project) => ({
    ...project,
    hasImage: imageExists(project.image),
  }));

  return (
    <Reveal id="projects" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading title="Projects" />
      <ProjectCarousel projects={items} />
    </Reveal>
  );
}
