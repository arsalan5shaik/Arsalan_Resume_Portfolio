import { events } from "@/lib/data/events";

export interface SectionMeta {
  id: string;
  label: string;
}

// Canonical page order below the hero. Events is conditional so the nav
// doesn't show it (or leave a gap) when it's empty.
export const allSections: SectionMeta[] = [
  { id: "resume", label: "Resume" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  ...(events.length > 0 ? [{ id: "events", label: "Recent Events" }] : []),
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];
