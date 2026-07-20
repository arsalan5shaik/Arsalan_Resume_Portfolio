"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export function CarouselControls({
  activeIndex,
  total,
  atStart,
  atEnd,
  onPrev,
  onNext,
  prevLabel = "Previous",
  nextLabel = "Next",
}: {
  activeIndex: number;
  total: number;
  atStart: boolean;
  atEnd: boolean;
  onPrev: () => void;
  onNext: () => void;
  prevLabel?: string;
  nextLabel?: string;
}) {
  return (
    <div className="mt-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label={prevLabel}
          onClick={onPrev}
          disabled={atStart}
          className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          aria-label={nextLabel}
          onClick={onNext}
          disabled={atEnd}
          className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div className="flex flex-1 items-center gap-3">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
            style={{ width: `${((activeIndex + 1) / total) * 100}%` }}
          />
        </div>
        <p className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
          {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>
      </div>
    </div>
  );
}
