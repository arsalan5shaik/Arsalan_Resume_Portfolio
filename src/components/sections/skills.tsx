import { skills } from "@/lib/data/skills";
import { sectionIndex } from "@/lib/section-order";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { Badge } from "@/components/ui/badge";

export function Skills() {
  return (
    <Reveal id="skills" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <SectionHeading index={sectionIndex("skills")} eyebrow="Toolbox" title="Skills" />

      <StaggerGroup viewport className="flex flex-col gap-5">
        {skills.map((group) => (
          <StaggerItem
            key={group.category}
            className="flex flex-col gap-2 sm:flex-row sm:gap-6"
          >
            <p className="w-full shrink-0 text-sm font-medium text-muted-foreground sm:w-44">
              {group.category}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <Badge
                  key={item}
                  variant="outline"
                  className="border-primary/20 bg-primary/5 text-primary transition-colors hover:bg-primary/10"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Reveal>
  );
}
