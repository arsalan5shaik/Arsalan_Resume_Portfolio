import { events } from "@/lib/data/events";

export interface SectionMeta {
  id: string;
  label: string;
}

// Canonical page order below the hero. Events is conditional so indices
// (and the nav) never skip a number when it's empty.
export const allSections: SectionMeta[] = [
  { id: "resume", label: "Resume" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  ...(events.length > 0 ? [{ id: "events", label: "Events" }] : []),
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export function sectionIndex(id: string): number {
  return allSections.findIndex((section) => section.id === id) + 1;
}
