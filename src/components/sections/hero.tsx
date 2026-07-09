import { Download, MapPin, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

import { profile } from "@/lib/data/profile";
import { imageExists } from "@/lib/image-exists";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function Hero() {
  const hasResume = imageExists(profile.resumePdfPath);

  return (
    <section id="about" className="mx-auto max-w-5xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
      <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
        <Avatar className="size-28 border border-border sm:size-36">
          <AvatarImage src={profile.avatarImage} alt={profile.name} />
          <AvatarFallback className="text-2xl">
            {initials(profile.name)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {profile.name}
          </h1>
          <p className="mt-1 text-lg text-muted-foreground">{profile.title}</p>

          <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4" />
            {profile.location}
          </p>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/90">
            {profile.bio}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
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
              render={<a href={`mailto:${profile.email}`} />}
            >
              <Mail className="size-4" />
              Email
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
