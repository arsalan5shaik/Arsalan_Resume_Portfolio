"use client";

import * as React from "react";

// Each card's *achievable* scroll target — offsetLeft clamped to the track's
// actual max scrollLeft. With a wide peek and few cards, the browser can't
// scroll far enough right to reach the last card's raw offsetLeft, so
// comparing against unclamped values picks the wrong "closest" card once
// scrollLeft is pinned at the end.
function cardScrollTargets(track: HTMLElement): number[] {
  const maxScroll = track.scrollWidth - track.clientWidth;
  return Array.from(track.children).map((child) =>
    Math.min((child as HTMLElement).offsetLeft, maxScroll)
  );
}

function closestCardIndex(track: HTMLElement): number {
  const targets = cardScrollTargets(track);
  let closest = 0;
  let minDist = Infinity;
  targets.forEach((target, i) => {
    const dist = Math.abs(target - track.scrollLeft);
    if (dist < minDist) {
      minDist = dist;
      closest = i;
    }
  });
  return closest;
}

// Shared behavior behind every horizontal drag/arrow/keyboard carousel on
// the site (Projects, Events, ...): scroll tracking, click-drag-to-pan for
// mouse, and keyboard arrow navigation, all snapping to each card's real
// position rather than an assumed uniform width.
export function useCarousel(itemCount: number) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const dragState = React.useRef<{ startX: number; startScroll: number } | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);

  const scrollToIndex = React.useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = Math.max(0, Math.min(index, itemCount - 1));
      const targets = cardScrollTargets(track);
      track.scrollTo({ left: targets[clamped], behavior: "smooth" });
    },
    [itemCount]
  );

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let ticking = false;

    function updateActive() {
      ticking = false;
      const el = trackRef.current;
      if (!el) return;
      setActiveIndex(closestCardIndex(el));
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActive);
      }
    }

    const initialFrame = requestAnimationFrame(updateActive);
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(initialFrame);
      track.removeEventListener("scroll", onScroll);
    };
  }, []);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType !== "mouse") return;
    const track = trackRef.current;
    if (!track) return;
    dragState.current = { startX: e.clientX, startScroll: track.scrollLeft };
    track.setPointerCapture(e.pointerId);
    setDragging(true);
  }
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragState.current) return;
    const track = trackRef.current;
    if (!track) return;
    track.scrollLeft = dragState.current.startScroll - (e.clientX - dragState.current.startX);
  }
  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragState.current) return;
    dragState.current = null;
    setDragging(false);
    trackRef.current?.releasePointerCapture(e.pointerId);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollToIndex(activeIndex + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollToIndex(activeIndex - 1);
    }
  }

  return {
    trackRef,
    activeIndex,
    dragging,
    scrollToIndex,
    trackHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerLeave: onPointerUp,
      onKeyDown,
    },
  };
}
