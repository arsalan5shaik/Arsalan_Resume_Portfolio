import Image from "next/image";
import { Award, ExternalLink } from "lucide-react";

import { certifications } from "@/lib/data/certifications";
import { imageExists } from "@/lib/image-exists";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";

export function Certifications() {
  return (
    <section id="certifications" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <SectionHeading eyebrow="Credentials" title="Certifications" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => {
          const hasImage = imageExists(cert.image);

          return (
            <Card key={cert.name}>
              <CardContent className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-muted">
                  {hasImage ? (
                    <Image
                      src={cert.image!}
                      alt={cert.name}
                      width={40}
                      height={40}
                      className="rounded-md object-contain"
                    />
                  ) : (
                    <Award className="size-5 text-muted-foreground" />
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-semibold leading-snug">
                    {cert.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {cert.issuer}
                    {cert.date ? ` · ${cert.date}` : ""}
                  </p>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ExternalLink className="size-3.5" />
                      Verify
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
