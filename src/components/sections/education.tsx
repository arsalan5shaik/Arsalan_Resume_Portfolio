import { education } from "@/lib/data/education";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Education() {
  return (
    <section id="education" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <SectionHeading eyebrow="Background" title="Education" />

      <Card>
        <CardHeader className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold">{education.school}</h3>
            <p className="text-muted-foreground">
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
                <Badge key={course} variant="outline">
                  {course}
                </Badge>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </section>
  );
}
