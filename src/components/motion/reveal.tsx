"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export function Reveal({
  id,
  className,
  delay = 0,
  children,
}: {
  id?: string;
  className?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      className={cn("scroll-mt-24", className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {children}
    </motion.section>
  );
}
