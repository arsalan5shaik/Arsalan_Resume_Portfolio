import { experience } from "@/lib/data/experience";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <SectionHeading eyebrow="Career" title="Work Experience" />

      <div className="flex flex-col gap-6">
        {experience.map((job) => (
          <Card key={`${job.company}-${job.startDate}`}>
            <CardHeader className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold">{job.role}</h3>
                <p className="text-muted-foreground">{job.company}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                {job.startDate} – {job.endDate}
              </p>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-foreground/90">
                {job.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
