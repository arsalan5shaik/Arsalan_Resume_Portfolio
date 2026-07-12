import { events } from "@/lib/data/events";
import { imageExists } from "@/lib/image-exists";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { EventCarousel } from "@/components/sections/event-carousel";

export function Events() {
  if (events.length === 0) return null;

  const items = events.map((event) => ({
    ...event,
    hasImage: imageExists(event.image),
  }));

  return (
    <Reveal id="events" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <SectionHeading title="Recent Events" />
      <EventCarousel events={items} />
    </Reveal>
  );
}
