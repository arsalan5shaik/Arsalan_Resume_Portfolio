import { Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

import { profile } from "@/lib/data/profile";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";

const links = [
  {
    label: "GitHub",
    value: "arsalan5shaik",
    href: (p: typeof profile) => p.githubUrl,
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    value: "arsalanshaik",
    href: (p: typeof profile) => p.linkedinUrl,
    icon: FaLinkedin,
  },
  {
    label: "Email",
    value: (p: typeof profile) => p.email,
    href: (p: typeof profile) => `mailto:${p.email}`,
    icon: Mail,
  },
  {
    label: "Location",
    value: (p: typeof profile) => p.location,
    href: null,
    icon: MapPin,
  },
] as const;

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <SectionHeading eyebrow="Get In Touch" title="Contact" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {links.map((link) => {
          const Icon = link.icon;
          const display =
            typeof link.value === "function" ? link.value(profile) : link.value;
          const content = (
            <CardContent className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted">
                <Icon className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{link.label}</p>
                <p className="truncate text-sm font-medium">{display}</p>
              </div>
            </CardContent>
          );

          if (!link.href) {
            return <Card key={link.label}>{content}</Card>;
          }

          return (
            <a
              key={link.label}
              href={link.href(profile)}
              target={link.label === "Email" ? undefined : "_blank"}
              rel="noopener noreferrer"
            >
              <Card className="transition-colors hover:bg-muted/50">{content}</Card>
            </a>
          );
        })}
      </div>
    </section>
  );
}
