"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

/** `viewport`: trigger on scroll-into-view instead of immediately on mount
 *  (use for below-the-fold sections; leave off for above-the-fold content
 *  like the hero, which should animate in on page load). */
export function StaggerGroup({
  children,
  className,
  viewport = false,
}: {
  children: React.ReactNode;
  className?: string;
  viewport?: boolean;
}) {
  const viewportProps = viewport
    ? { whileInView: "visible", viewport: { once: true, margin: "-60px" } }
    : { animate: "visible" };

  return (
    <motion.div className={className} initial="hidden" variants={containerVariants} {...viewportProps}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
