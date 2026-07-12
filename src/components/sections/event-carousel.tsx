"use client";

import Image from "next/image";
import { CalendarDays, ExternalLink, Trophy } from "lucide-react";

import { Event } from "@/lib/types";
import { useCarousel } from "@/components/motion/use-carousel";
import { CarouselControls } from "@/components/motion/carousel-controls";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type CarouselEvent = Event & { hasImage: boolean };

export function EventCarousel({ events }: { events: CarouselEvent[] }) {
  const { trackRef, activeIndex, dragging, scrollToIndex, trackHandlers } = useCarousel(
    events.length
  );

  return (
    <div>
      <div
        ref={trackRef}
        role="region"
        aria-label="Recent events, scroll or use the arrow keys to browse"
        tabIndex={0}
        {...trackHandlers}
        className={cn(
          "flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 sm:max-w-xl lg:max-w-2xl [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          dragging ? "cursor-grabbing select-none scroll-auto" : "cursor-grab scroll-smooth"
        )}
      >
        {events.map((event) => (
          <Card
            key={event.name}
            className="flex w-[85vw] shrink-0 snap-start flex-col transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 sm:w-[420px]"
          >
            <CardHeader>
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10">
                  {event.hasImage ? (
                    <Image
                      src={event.image!}
                      alt={event.name}
                      width={40}
                      height={40}
                      draggable={false}
                      className="rounded-md object-contain"
                    />
                  ) : (
                    <CalendarDays className="size-5 text-primary" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold">{event.name}</h3>
                    {event.type && (
                      <Badge
                        variant="outline"
                        className="border-primary/20 bg-primary/5 text-primary"
                      >
                        {event.type}
                      </Badge>
                    )}
                  </div>
                  {event.result && (
                    <Badge variant="secondary" className="mt-1.5 w-fit gap-1">
                      <Trophy className="size-3" />
                      {event.result}
                    </Badge>
                  )}
                  <p className="mt-1 text-sm text-muted-foreground">
                    {[event.date, event.location].filter(Boolean).join(" · ")}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex flex-1 flex-col gap-3">
              {event.project && <p className="text-sm font-medium">{event.project}</p>}
              <p className="text-sm leading-relaxed text-foreground/90">
                {event.description}
              </p>

              {event.links && event.links.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-4 pt-2 text-sm">
                  {event.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
                    >
                      <ExternalLink className="size-4" />
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <CarouselControls
        activeIndex={activeIndex}
        total={events.length}
        onPrev={() => scrollToIndex(activeIndex - 1)}
        onNext={() => scrollToIndex(activeIndex + 1)}
        prevLabel="Previous event"
        nextLabel="Next event"
      />
    </div>
  );
}
