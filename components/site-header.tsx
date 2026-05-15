"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { nav, churchInfo } from "@/lib/church-info";
import { MobileNav } from "@/components/mobile-nav";
import { GiveButton } from "@/components/GiveButton";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "bg-background"
      )}
    >
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          aria-label={`${churchInfo.name} home`}
        >
          {churchInfo.logo ? (
            <Image
              src={churchInfo.logo}
              alt={churchInfo.name}
              width={240}
              height={48}
              className="h-9 w-auto md:h-10"
              priority
            />
          ) : (
            <>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground font-serif text-base">
                {(churchInfo.shortName || churchInfo.name).charAt(0).toUpperCase()}
              </span>
              <span className="hidden font-serif text-lg leading-none sm:inline">
                {(() => {
                  const words = churchInfo.name.trim().split(/\s+/);
                  if (words.length < 2) return churchInfo.name;
                  const suffix = words[words.length - 1];
                  const main = words.slice(0, -1).join(" ");
                  return (
                    <>
                      {main}
                      <span className="text-muted-foreground"> · {suffix}</span>
                    </>
                  );
                })()}
              </span>
            </>
          )}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const hasChildren = "children" in item && item.children;
            return (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                >
                  {item.label}
                  {hasChildren ? (
                    <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                  ) : null}
                </Link>
                {hasChildren ? (
                  <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="min-w-[200px] rounded-lg border border-border bg-card p-1.5 shadow-lg">
                      {item.children!.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-md px-3 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-foreground"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <GiveButton variant="nav" className="hidden sm:inline-flex" />
          <Button asChild variant="accent" size="sm" className="hidden sm:inline-flex">
            <Link href="/visit">Plan a Visit</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
