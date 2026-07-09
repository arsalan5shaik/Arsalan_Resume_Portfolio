import { hackathons } from "@/lib/data/hackathons";

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
  ...(hackathons.length > 0
    ? [{ label: "Hackathons", href: "#hackathons" }]
    : []),
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];
