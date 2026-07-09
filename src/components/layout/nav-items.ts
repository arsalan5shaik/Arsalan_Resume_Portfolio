import { allSections } from "@/lib/section-order";

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  ...allSections
    .filter((section) => section.id !== "resume")
    .map((section) => ({ label: section.label, href: `#${section.id}` })),
];
