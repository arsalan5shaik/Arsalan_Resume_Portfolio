import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

import { projects } from "@/lib/data/projects";
import { imageExists } from "@/lib/image-exists";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Projects() {
  return (
    <Reveal id="projects" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <SectionHeading eyebrow="Selected Work" title="Projects" />

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => {
          const hasImage = imageExists(project.image);

          return (
            <Card
              key={project.slug}
              className="group flex flex-col overflow-hidden pt-0 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              {hasImage && (
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={project.image!}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}

              <CardHeader className={hasImage ? "pt-6" : undefined}>
                <h3 className="text-lg font-semibold">{project.title}</h3>
                {project.organization && (
                  <p className="text-sm text-muted-foreground">
                    {project.organization}
                  </p>
                )}
              </CardHeader>

              <CardContent className="flex flex-1 flex-col gap-4">
                <p className="text-sm leading-relaxed text-foreground/90">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="border-primary/20 bg-primary/5 text-primary"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>

                {(project.liveUrl || project.repoUrl) && (
                  <div className="mt-auto flex gap-4 pt-2 text-sm">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
                      >
                        <ExternalLink className="size-4" />
                        Live
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
                      >
                        <FaGithub className="size-4" />
                        Code
                      </a>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </Reveal>
  );
}
