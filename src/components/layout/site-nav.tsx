"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation } from "@/data/site";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="site-nav" aria-label="Primary">
      {navigation.map((item) => {
        const isActive = item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn("site-nav__link", isActive && "site-nav__link--active")}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
