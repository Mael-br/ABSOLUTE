import Link from "next/link";

import { footerResources, navigation, siteConfig } from "@/data/site";
import { BrandMark } from "@/components/ui/brand-mark";
import {
  DiscordIcon,
  GithubIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  LinkedinIcon,
  TelegramIcon
} from "@/components/ui/icons";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <BrandMark />
          <p>
            Tecnologia que conecta.
            <br />
            Automacao que transforma.
            <br />
            Solucoes que impulsionam o futuro.
          </p>
        </div>

        <div>
          <h3>Navegacao</h3>
          <div className="site-footer__links">
            {navigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3>Recursos</h3>
          <div className="site-footer__links">
            {footerResources.map((item) => (
              <a
                href={item.href}
                key={item.label}
                target={item.href.startsWith("/") ? undefined : "_blank"}
                rel={item.href.startsWith("/") ? undefined : "noreferrer"}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3>Contato</h3>
          <div className="site-footer__links">
            <a href={`mailto:${siteConfig.contactEmail}`}>
              <MailIcon className="icon" />
              {siteConfig.contactEmail}
            </a>
            <a href={siteConfig.discordUrl} target="_blank" rel="noreferrer">
              <DiscordIcon className="icon" />
              Discord
            </a>
            <span>
              <MapPinIcon className="icon" />
              Brasil • Operacao remota
            </span>
          </div>
        </div>

        <div>
          <h3>Redes sociais</h3>
          <div className="site-footer__socials">
            <a href={siteConfig.discordUrl} target="_blank" rel="noreferrer" aria-label="Discord" className="social-link">
              <DiscordIcon className="icon" />
            </a>
            <a
              href={siteConfig.social.telegram}
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              className="social-link"
            >
              <TelegramIcon className="icon" />
            </a>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="social-link"
            >
              <InstagramIcon className="icon" />
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="social-link"
            >
              <LinkedinIcon className="icon" />
            </a>
            <a href={siteConfig.social.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="social-link">
              <GithubIcon className="icon" />
            </a>
          </div>
        </div>
      </div>
      <div className="container site-footer__bottom">© 2026 Absolute. Todos os direitos reservados.</div>
    </footer>
  );
}
