import type { Metadata } from "next";

import { ContactForm } from "@/components/forms/contact-form";
import { MailIcon, SupportIcon } from "@/components/ui/icons";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contato"
};

export default function ContactPage() {
  return (
    <div className="page-shell">
      <section className="container page-hero fade-up">
        <span className="eyebrow eyebrow--pill">Contato</span>
        <h1>Conte o desafio. Nos desenhamos a solucao.</h1>
        <p>
          Envie o contexto do projeto para receber um direcionamento inicial, proposta estrategica e proximos passos
          com o time da Absolute.
        </p>
      </section>

      <section className="container section contact-layout">
        <ContactForm />

        <div className="contact-info stagger-grid">
          <article className="glass-card contact-info__card">
            <div className="service-card__icon">
              <MailIcon className="icon" />
            </div>
            <h2>E-mail</h2>
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
          </article>

          <article className="glass-card contact-info__card">
            <div className="service-card__icon">
              <SupportIcon className="icon" />
            </div>
            <h2>Discord</h2>
            <a href={siteConfig.discordUrl} target="_blank" rel="noreferrer">
              Entrar no servidor
            </a>
          </article>
        </div>
      </section>
    </div>
  );
}
