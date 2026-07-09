"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const HOVER_SELECTOR = 'a, button, [role="button"], input, textarea, [data-cursor-hover]';

function subscribeFinePointer(callback: () => void) {
  const fine = window.matchMedia("(pointer: fine)");
  fine.addEventListener("change", callback);
  return () => fine.removeEventListener("change", callback);
}

function useFinePointer() {
  return React.useSyncExternalStore(
    subscribeFinePointer,
    () => window.matchMedia("(pointer: fine)").matches,
    () => false
  );
}

function subscribeReducedMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function useReducedMotion() {
  return React.useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
}

export function Cursor() {
  const enabled = useFinePointer();
  const reduceMotion = useReducedMotion();
  const [hovering, setHovering] = React.useState(false);
  const [visible, setVisible] = React.useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = reduceMotion
    ? { stiffness: 1000, damping: 100 }
    : { stiffness: 500, damping: 34, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  React.useEffect(() => {
    if (!enabled) return;
    document.body.style.cursor = "none";
    return () => {
      document.body.style.cursor = "";
    };
  }, [enabled]);

  React.useEffect(() => {
    if (!enabled) return;

    function onMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as HTMLElement;
      setHovering(Boolean(target.closest(HOVER_SELECTOR)));
    }
    function onLeave() {
      setVisible(false);
    }

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        backgroundColor: "#fff",
      }}
      animate={{
        width: hovering ? 40 : 16,
        height: hovering ? 40 : 16,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    />
  );
}
