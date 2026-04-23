import Link from "next/link";

import { getCurrentUser } from "@/server/auth";
import { BrandMark } from "@/components/ui/brand-mark";
import { UserIcon } from "@/components/ui/icons";

import { LogoutButton } from "@/components/layout/logout-button";
import { SiteNav } from "@/components/layout/site-nav";

export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="site-header__brand" aria-label="Absolute home">
          <BrandMark />
        </Link>

        <SiteNav />

        <div className="site-header__actions">
          {user ? (
            <>
              <Link href="/dashboard" className="button button--ghost">
                Dashboard
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link href="/login" className="button button--outline site-header__auth">
              <UserIcon className="icon" />
              Log In / Sign Up
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

