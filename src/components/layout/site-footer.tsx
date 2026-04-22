import Link from "next/link";

import { navigation, siteConfig } from "@/data/site";
import { BrandMark } from "@/components/ui/brand-mark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <BrandMark />
          <p>
            Tecnologia que conecta.
            <br />
            Automação que transforma.
            <br />
            Soluções que impulsionam o futuro.
          </p>
        </div>

        <div>
          <h3>Navegação</h3>
          <div className="site-footer__links">
            {navigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3>Contato</h3>
          <div className="site-footer__links">
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
            <a href={siteConfig.discordUrl} target="_blank" rel="noreferrer">
              Discord
            </a>
            <span>Brasil • Operação remota</span>
          </div>
        </div>

        <div>
          <h3>Redes sociais</h3>
          <div className="site-footer__links">
            <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={siteConfig.social.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={siteConfig.social.telegram} target="_blank" rel="noreferrer">
              Telegram
            </a>
          </div>
        </div>
      </div>
      <div className="container site-footer__bottom">© 2026 Absolute. Todos os direitos reservados.</div>
    </footer>
  );
}

