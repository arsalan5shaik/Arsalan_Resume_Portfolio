"use client";

import * as React from "react";

const EDGE = 2; // px tolerance for treating a scroll position as an edge

interface CarouselState {
  activeIndex: number; // leftmost card in view (forced to last at the end)
  atStart: boolean;
  atEnd: boolean;
}

// Shared behavior behind every horizontal drag/arrow/keyboard carousel on the
// site (Projects, Events, ...). Navigation is *position*-based, not index-based:
// with several cards visible at once the trailing cards all share the same
// end-scroll position, so "go to card N" math breaks down. Instead prev/next
// step to the nearest card edge in each direction and clamp to the real scroll
// bounds, which stays correct no matter how many cards are visible.
export function useCarousel(itemCount: number) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const dragState = React.useRef<{ startX: number; startScroll: number } | null>(null);
  const [dragging, setDragging] = React.useState(false);
  const [state, setState] = React.useState<CarouselState>({
    activeIndex: 0,
    atStart: true,
    atEnd: itemCount <= 1,
  });

  const measure = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const x = el.scrollLeft;
    const atStart = x <= EDGE;
    const atEnd = maxScroll <= EDGE || x >= maxScroll - EDGE;

    let leftmost = 0;
    Array.from(el.children).forEach((child, i) => {
      if ((child as HTMLElement).offsetLeft <= x + EDGE) leftmost = i;
    });
    const activeIndex = atEnd ? itemCount - 1 : leftmost;

    setState((prev) =>
      prev.activeIndex === activeIndex && prev.atStart === atStart && prev.atEnd === atEnd
        ? prev
        : { activeIndex, atStart, atEnd }
    );
  }, [itemCount]);

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let ticking = false;

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          measure();
        });
      }
    }

    const initialFrame = requestAnimationFrame(measure);
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(initialFrame);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const next = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const x = el.scrollLeft;
    const nextCard = Array.from(el.children).find(
      (c) => (c as HTMLElement).offsetLeft > x + EDGE
    ) as HTMLElement | undefined;
    const target = nextCard ? Math.min(nextCard.offsetLeft, maxScroll) : maxScroll;
    el.scrollTo({ left: target, behavior: "smooth" });
  }, []);

  const prev = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    let target = 0;
    const x = el.scrollLeft;
    Array.from(el.children).forEach((c) => {
      const left = (c as HTMLElement).offsetLeft;
      if (left < x - EDGE) target = left;
    });
    el.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
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
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  }

  return {
    trackRef,
    dragging,
    activeIndex: state.activeIndex,
    atStart: state.atStart,
    atEnd: state.atEnd,
    next,
    prev,
    trackHandlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerLeave: onPointerUp,
      onKeyDown,
    },
  };
}
