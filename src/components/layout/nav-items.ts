import { events } from "@/lib/data/events";

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  ...(events.length > 0 ? [{ label: "Events", href: "#events" }] : []),
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
