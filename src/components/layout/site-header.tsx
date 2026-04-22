import Link from "next/link";

import { navigation } from "@/data/site";
import { getCurrentUser } from "@/server/auth";
import { BrandMark } from "@/components/ui/brand-mark";

import { LogoutButton } from "@/components/layout/logout-button";

export async function SiteHeader() {
  const user = await getCurrentUser();

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="site-header__brand" aria-label="Absolute home">
          <BrandMark />
        </Link>

        <nav className="site-nav" aria-label="Primary">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="site-nav__link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-header__actions">
          {user ? (
            <>
              <Link href="/dashboard" className="button button--ghost">
                Dashboard
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link href="/login" className="button button--ghost">
              Entrar / Criar conta
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

