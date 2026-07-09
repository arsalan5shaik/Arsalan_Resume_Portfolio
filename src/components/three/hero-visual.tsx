"use client";

import * as React from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(
  () => import("@/components/three/hero-scene").then((m) => m.HeroScene),
  { ssr: false }
);

function subscribeCanRender3d(callback: () => void) {
  const mql = window.matchMedia("(min-width: 640px)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function useCanRender3d() {
  return React.useSyncExternalStore(
    subscribeCanRender3d,
    () => window.matchMedia("(min-width: 640px)").matches,
    () => false
  );
}

function subscribeReducedMotion(callback: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function useReducedMotion() {
  return React.useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

// Skipped on narrow viewports to protect mobile performance — the CSS
// gradient behind it (rendered by the parent Hero) stays visible either way.
export function HeroVisual() {
  const canRender3d = useCanRender3d();
  const reduceMotion = useReducedMotion();

  if (!canRender3d) return null;

  return (
    <div className="absolute inset-0">
      <HeroScene reduceMotion={reduceMotion} />
    </div>
  );
}
