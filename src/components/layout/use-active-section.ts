"use client";

import * as React from "react";

// Highlights whichever section's top has crossed just below the sticky
// header. Falls back to the last section once you've hit the bottom of the
// page, since a short final section can otherwise never "win".
export function useActiveSection(ids: string[]) {
  const [activeId, setActiveId] = React.useState(ids[0] ?? "");

  React.useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const headerOffset = 96;
    let ticking = false;

    function updateActive() {
      ticking = false;

      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;

      if (atBottom) {
        setActiveId(elements[elements.length - 1].id);
        return;
      }

      let current = elements[0].id;
      for (const el of elements) {
        if (el.getBoundingClientRect().top - headerOffset <= 0) {
          current = el.id;
        }
      }
      setActiveId(current);
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActive);
      }
    }

    const initialFrame = requestAnimationFrame(updateActive);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(initialFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids]);

  return activeId;
}
