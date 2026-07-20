import Image from "next/image";
import { Building2 } from "lucide-react";

import { experience } from "@/lib/data/experience";
import { imageExists } from "@/lib/image-exists";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Experience() {
  return (
    <Reveal id="experience" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <SectionHeading title="Work Experience" />

      <StaggerGroup viewport className="flex flex-col gap-6">
        {experience.map((job) => {
          const hasLogo = imageExists(job.logo);

          return (
            <StaggerItem key={`${job.company}-${job.startDate}`}>
              <Card className="transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10">
                      {hasLogo ? (
                        <Image
                          src={job.logo!}
                          alt={job.company}
                          width={40}
                          height={40}
                          className="size-full rounded-md object-contain p-0.5"
                        />
                      ) : (
                        <Building2 className="size-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{job.role}</h3>
                      <p className="text-primary">{job.company}</p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="w-fit border-primary/20 bg-primary/5 text-xs text-muted-foreground"
                  >
                    {job.startDate} – {job.endDate}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground/90">
                    {job.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </Reveal>
  );
}
