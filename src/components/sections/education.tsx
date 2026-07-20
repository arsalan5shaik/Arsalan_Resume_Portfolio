import Image from "next/image";
import { GraduationCap } from "lucide-react";

import { education } from "@/lib/data/education";
import { imageExists } from "@/lib/image-exists";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Education() {
  const hasLogo = imageExists(education.logo);

  return (
    <Reveal id="education" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <SectionHeading title="Education" />

      <Card className="transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10">
              {hasLogo ? (
                <Image
                  src={education.logo!}
                  alt={education.school}
                  width={40}
                  height={40}
                  className="size-full rounded-md object-contain p-0.5"
                />
              ) : (
                <GraduationCap className="size-5 text-primary" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{education.school}</h3>
              <p className="text-primary">
                {education.degree}
                {education.gpa ? ` · GPA ${education.gpa}` : ""}
              </p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {education.location} · {education.graduationDate}
          </p>
        </CardHeader>

        {education.coursework && education.coursework.length > 0 && (
          <CardContent>
            <p className="mb-2 text-sm font-medium text-muted-foreground">
              Relevant Coursework
            </p>
            <div className="flex flex-wrap gap-1.5">
              {education.coursework.map((course) => (
                <Badge
                  key={course}
                  variant="outline"
                  className="border-primary/20 bg-primary/5 text-primary"
                >
                  {course}
                </Badge>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </Reveal>
  );
}
