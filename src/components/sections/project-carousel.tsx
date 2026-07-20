"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

import { Project } from "@/lib/types";
import { useCarousel } from "@/components/motion/use-carousel";
import { CarouselControls } from "@/components/motion/carousel-controls";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type CarouselProject = Project & { hasImage: boolean };

export function ProjectCarousel({ projects }: { projects: CarouselProject[] }) {
  const { trackRef, activeIndex, atStart, atEnd, dragging, next, prev, trackHandlers } =
    useCarousel(projects.length);

  return (
    <div>
      <div
        ref={trackRef}
        role="region"
        aria-label="Projects, scroll or use the arrow keys to browse"
        tabIndex={0}
        {...trackHandlers}
        className={cn(
          "relative flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          dragging ? "cursor-grabbing select-none scroll-auto" : "cursor-grab scroll-smooth"
        )}
      >
        {projects.map((project) => (
          <Card
            key={project.slug}
            className="group flex w-[85vw] shrink-0 snap-start flex-col overflow-hidden pt-0 sm:w-[420px]"
          >
            {project.hasImage && (
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={project.image!}
                  alt={project.title}
                  fill
                  draggable={false}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}

            <CardHeader className={project.hasImage ? "pt-6" : undefined}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  {project.organization && (
                    <p className="text-sm text-muted-foreground">{project.organization}</p>
                  )}
                </div>
                {project.stat && (
                  <div className="shrink-0 text-right">
                    <p className="font-display text-2xl font-semibold text-primary">
                      {project.stat.value}
                    </p>
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      {project.stat.label}
                    </p>
                  </div>
                )}
              </div>
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
        ))}
      </div>

      <CarouselControls
        activeIndex={activeIndex}
        total={projects.length}
        atStart={atStart}
        atEnd={atEnd}
        onPrev={prev}
        onNext={next}
        prevLabel="Previous project"
        nextLabel="Next project"
      />
    </div>
  );
}
