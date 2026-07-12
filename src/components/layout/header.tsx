"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

import { profile } from "@/lib/data/profile";
import { navItems } from "@/components/layout/nav-items";
import { useActiveSection } from "@/components/layout/use-active-section";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export function Header() {
  const sectionIds = React.useMemo(
    () => navItems.map((item) => item.href.slice(1)),
    []
  );
  const activeId = useActiveSection(sectionIds);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="#top" className="font-semibold tracking-tight">
          {profile.name}
        </Link>

        <nav className="hidden items-center gap-1 text-sm md:flex">
          {navItems.map((item) => {
            const isActive = activeId === item.href.slice(1);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-3 py-1.5 transition-colors",
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon" aria-label="Open menu" />
                }
              >
                <Menu className="size-5" />
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <SheetHeader>
                  <SheetTitle>{profile.name}</SheetTitle>
                </SheetHeader>
                <nav className="mt-4 flex flex-col gap-1 px-4 text-base">
                  {navItems.map((item) => {
                    const isActive = activeId === item.href.slice(1);
                    return (
                      <SheetClose
                        key={item.href}
                        nativeButton={false}
                        render={
                          <Link
                            href={item.href}
                            className={cn(
                              "rounded-md px-2 py-1.5 transition-colors",
                              isActive
                                ? "bg-primary/10 font-medium text-primary"
                                : "text-muted-foreground hover:text-foreground"
                            )}
                          />
                        }
                      >
                        {item.label}
                      </SheetClose>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
