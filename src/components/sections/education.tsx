import { education } from "@/lib/data/education";
import { sectionIndex } from "@/lib/section-order";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Education() {
  return (
    <Reveal id="education" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <SectionHeading
        index={sectionIndex("education")}
        eyebrow="Background"
        title="Education"
      />

      <Card className="transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
        <CardHeader className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold">{education.school}</h3>
            <p className="text-primary">
              {education.degree}
              {education.gpa ? ` · GPA ${education.gpa}` : ""}
            </p>
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
