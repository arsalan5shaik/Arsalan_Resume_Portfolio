import { Download, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

import { profile } from "@/lib/data/profile";
import { imageExists } from "@/lib/image-exists";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { HeroVisual } from "@/components/three/hero-visual";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

const stageOutlineButton =
  "border-white/15 bg-white/[0.04] text-stage-foreground hover:bg-white/10 hover:text-stage-foreground";

export function Hero() {
  const hasResume = imageExists(profile.resumePdfPath);

  return (
    <Reveal id="about" className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-stage-bg text-stage-foreground ring-1 ring-stage-border">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 85% 15%, color-mix(in oklch, var(--stage-accent-from) 30%, transparent), transparent 65%)",
          }}
        />

        <StaggerGroup className="relative flex flex-col gap-12 px-6 py-10 sm:px-10 sm:py-14 lg:flex-row lg:items-center lg:gap-16 lg:py-20">
          <div className="flex-1">
            <StaggerItem className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs uppercase tracking-widest text-stage-muted">
              <span>00 — {profile.title}</span>
              <span>{profile.location}</span>
            </StaggerItem>

            <StaggerItem>
              <h1 className="mt-8 font-display text-[clamp(2.75rem,7vw,4.75rem)] font-semibold leading-[1.05] tracking-tight">
                {profile.name}
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p
                className="mt-3 max-w-xl font-display text-[clamp(1.375rem,3vw,1.875rem)] font-medium leading-snug bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, var(--stage-accent-from), var(--stage-accent-to))",
                }}
              >
                {profile.tagline}
              </p>
            </StaggerItem>

            <StaggerItem>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-stage-muted">
                {profile.bio}
              </p>
            </StaggerItem>

            <StaggerItem className="mt-9 flex flex-wrap items-center gap-3">
              {hasResume && (
                <Button
                  nativeButton={false}
                  render={<a href={profile.resumePdfPath} download />}
                >
                  <Download className="size-4" />
                  Download Resume
                </Button>
              )}
              <Button
                variant="outline"
                nativeButton={false}
                className={stageOutlineButton}
                render={
                  <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" />
                }
              >
                <FaGithub className="size-4" />
                GitHub
              </Button>
              <Button
                variant="outline"
                nativeButton={false}
                className={stageOutlineButton}
                render={
                  <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" />
                }
              >
                <FaLinkedin className="size-4" />
                LinkedIn
              </Button>
              <Button
                variant="outline"
                nativeButton={false}
                className={stageOutlineButton}
                render={<a href={`mailto:${profile.email}`} />}
              >
                <Mail className="size-4" />
                Email
              </Button>
            </StaggerItem>
          </div>

          <StaggerItem className="relative mx-auto flex size-56 shrink-0 items-center justify-center sm:size-72 lg:size-80">
            <div
              aria-hidden
              className="absolute inset-0 rounded-full opacity-70 blur-2xl"
              style={{
                background:
                  "conic-gradient(from 140deg, var(--stage-accent-from), var(--stage-accent-to), var(--stage-accent-from))",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-6 rounded-full opacity-80"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, var(--stage-accent-to), var(--stage-accent-from) 70%)",
              }}
            />
            <HeroVisual />
            <Avatar className="relative size-32 ring-4 ring-white/15 ring-offset-4 ring-offset-stage-bg sm:size-44 lg:size-48">
              <AvatarImage src={profile.avatarImage} alt={profile.name} />
              <AvatarFallback className="bg-stage-bg-soft text-3xl text-stage-foreground">
                {initials(profile.name)}
              </AvatarFallback>
            </Avatar>
          </StaggerItem>
        </StaggerGroup>
      </div>
    </Reveal>
  );
}
