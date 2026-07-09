import Image from "next/image";
import { ExternalLink, Trophy } from "lucide-react";

import { events } from "@/lib/data/events";
import { imageExists } from "@/lib/image-exists";
import { sectionIndex } from "@/lib/section-order";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Events() {
  if (events.length === 0) return null;

  return (
    <Reveal id="events" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <SectionHeading index={sectionIndex("events")} eyebrow="Builder Mode" title="Events" />

      <div className="grid gap-6 sm:grid-cols-2">
        {events.map((event) => {
          const hasImage = imageExists(event.image);

          return (
            <Card
              key={event.name}
              className="group flex flex-col overflow-hidden pt-0 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              {hasImage && (
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    src={event.image!}
                    alt={event.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}

              <CardHeader className={hasImage ? "pt-6" : undefined}>
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
                  {event.result && (
                    <Badge variant="secondary" className="gap-1">
                      <Trophy className="size-3" />
                      {event.result}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {[event.date, event.location].filter(Boolean).join(" · ")}
                </p>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col gap-3">
                {event.project && (
                  <p className="text-sm font-medium">{event.project}</p>
                )}
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
          );
        })}
      </div>
    </Reveal>
  );
}
