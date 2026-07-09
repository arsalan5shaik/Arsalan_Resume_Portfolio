import Image from "next/image";
import { ExternalLink, Trophy } from "lucide-react";

import { hackathons } from "@/lib/data/hackathons";
import { imageExists } from "@/lib/image-exists";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Hackathons() {
  if (hackathons.length === 0) return null;

  return (
    <section id="hackathons" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <SectionHeading eyebrow="Builder Mode" title="Hackathons" />

      <div className="grid gap-6 sm:grid-cols-2">
        {hackathons.map((hackathon) => {
          const hasImage = imageExists(hackathon.image);

          return (
            <Card key={hackathon.name} className="flex flex-col overflow-hidden pt-0">
              {hasImage && (
                <div className="relative aspect-video w-full">
                  <Image
                    src={hackathon.image!}
                    alt={hackathon.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <CardHeader className={hasImage ? "pt-6" : undefined}>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold">{hackathon.name}</h3>
                  {hackathon.result && (
                    <Badge variant="secondary" className="gap-1">
                      <Trophy className="size-3" />
                      {hackathon.result}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {[hackathon.date, hackathon.location].filter(Boolean).join(" · ")}
                </p>
              </CardHeader>

              <CardContent className="flex flex-1 flex-col gap-3">
                <p className="text-sm font-medium">{hackathon.project}</p>
                <p className="text-sm leading-relaxed text-foreground/90">
                  {hackathon.description}
                </p>

                {hackathon.links && hackathon.links.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-4 pt-2 text-sm">
                    {hackathon.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
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
    </section>
  );
}
