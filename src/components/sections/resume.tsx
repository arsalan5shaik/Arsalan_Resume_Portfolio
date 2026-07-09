import { Download } from "lucide-react";

import { profile } from "@/lib/data/profile";
import { imageExists } from "@/lib/image-exists";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";

export function Resume() {
  const hasResume = imageExists(profile.resumePdfPath);

  return (
    <section id="resume" className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="Full Details" title="Resume" />
        {hasResume && (
          <Button
            nativeButton={false}
            render={<a href={profile.resumePdfPath} download />}
          >
            <Download className="size-4" />
            Download PDF
          </Button>
        )}
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-muted/30">
        {hasResume ? (
          <object
            data={profile.resumePdfPath}
            type="application/pdf"
            className="h-[70vh] w-full"
          >
            <div className="flex h-64 flex-col items-center justify-center gap-3 p-6 text-center text-sm text-muted-foreground">
              <p>Your browser can&apos;t preview PDFs inline.</p>
              <Button
                variant="outline"
                size="sm"
                nativeButton={false}
                render={<a href={profile.resumePdfPath} download />}
              >
                Download the resume instead
              </Button>
            </div>
          </object>
        ) : (
          <div className="flex h-48 flex-col items-center justify-center gap-1 p-6 text-center text-sm text-muted-foreground">
            <p>No resume uploaded yet.</p>
            <p>
              Drop your PDF at{" "}
              <code className="rounded bg-muted px-1 py-0.5">
                public{profile.resumePdfPath}
              </code>{" "}
              and it&apos;ll show up here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
