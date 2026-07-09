"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

import { Project } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type CarouselProject = Project & { hasImage: boolean };

// Each card's *achievable* scroll target — offsetLeft clamped to the track's
// actual max scrollLeft. With a wide peek and few cards, the browser can't
// scroll far enough right to reach the last card's raw offsetLeft, so
// comparing against unclamped values picks the wrong "closest" card once
// scrollLeft is pinned at the end.
function cardScrollTargets(track: HTMLElement): number[] {
  const maxScroll = track.scrollWidth - track.clientWidth;
  return Array.from(track.children).map((child) =>
    Math.min((child as HTMLElement).offsetLeft, maxScroll)
  );
}

function closestCardIndex(track: HTMLElement): number {
  const targets = cardScrollTargets(track);
  let closest = 0;
  let minDist = Infinity;
  targets.forEach((target, i) => {
    const dist = Math.abs(target - track.scrollLeft);
    if (dist < minDist) {
      minDist = dist;
      closest = i;
    }
  });
  return closest;
}

export function ProjectCarousel({ projects }: { projects: CarouselProject[] }) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const dragState = React.useRef<{ startX: number; startScroll: number } | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);

  const scrollToIndex = React.useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(index, projects.length - 1));
    const targets = cardScrollTargets(track);
    track.scrollTo({ left: targets[clamped], behavior: "smooth" });
  }, [projects.length]);

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let ticking = false;

    function updateActive() {
      ticking = false;
      const el = trackRef.current;
      if (!el) return;
      setActiveIndex(closestCardIndex(el));
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActive);
      }
    }

    const initialFrame = requestAnimationFrame(updateActive);
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(initialFrame);
      track.removeEventListener("scroll", onScroll);
    };
  }, []);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const track = trackRef.current;
    if (!track) return;
    dragState.current = { startX: e.clientX, startScroll: track.scrollLeft };
    track.setPointerCapture(e.pointerId);
    setDragging(true);
  }
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragState.current) return;
    const track = trackRef.current;
    if (!track) return;
    track.scrollLeft = dragState.current.startScroll - (e.clientX - dragState.current.startX);
  }
  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragState.current) return;
    dragState.current = null;
    setDragging(false);
    trackRef.current?.releasePointerCapture(e.pointerId);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollToIndex(activeIndex + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollToIndex(activeIndex - 1);
    }
  }

  return (
    <div>
      <div
        ref={trackRef}
        role="region"
        aria-label="Projects, scroll or use the arrow keys to browse"
        tabIndex={0}
        data-cursor-hover
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onKeyDown={onKeyDown}
        className={cn(
          "flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 sm:max-w-xl lg:max-w-2xl [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
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

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous project"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next project"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={activeIndex === projects.length - 1}
            className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>

        <div className="flex flex-1 items-center gap-3">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
              style={{
                width: `${((activeIndex + 1) / projects.length) * 100}%`,
              }}
            />
          </div>
          <p className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
            {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </p>
        </div>
      </div>
    </div>
  );
}
