import Link from "next/link";

import { BrandMark } from "@/components/ui/brand-mark";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  ArrowIcon,
  BoltIcon,
  BotIcon,
  CodeIcon,
  DatabaseIcon,
  ShieldIcon,
  SupportIcon
} from "@/components/ui/icons";
import { services, siteConfig, stats, technologies, whyChooseUs } from "@/data/site";

const statIcons = [BotIcon, CodeIcon, DatabaseIcon, SupportIcon];
const serviceMediaVariants = ["bot", "web", "api"] as const;

function ServiceArtwork({ variant }: { variant: (typeof serviceMediaVariants)[number] }) {
  if (variant === "bot") {
    return (
      <div className="service-figure service-figure--bot" aria-hidden="true">
        <div className="service-figure__bot-head" />
        <div className="service-figure__bot-eye service-figure__bot-eye--left" />
        <div className="service-figure__bot-eye service-figure__bot-eye--right" />
        <div className="service-figure__bot-body" />
      </div>
    );
  }

  if (variant === "web") {
    return (
      <div className="service-figure service-figure--web" aria-hidden="true">
        <div className="service-figure__window">
          <span />
          <span />
          <span />
          <div className="service-figure__code">&lt;/&gt;</div>
        </div>
      </div>
    );
  }

  return (
    <div className="service-figure service-figure--api" aria-hidden="true">
      <div className="service-figure__cube service-figure__cube--main" />
      <div className="service-figure__cube service-figure__cube--small service-figure__cube--one" />
      <div className="service-figure__cube service-figure__cube--small service-figure__cube--two" />
      <div className="service-figure__cube service-figure__cube--small service-figure__cube--three" />
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="page-shell page-shell--home">
      <section className="container hero hero--home">
        <div className="hero__content fade-up">
          <span className="eyebrow eyebrow--pill eyebrow--hero">Tecnologia • Inovacao • Resultados</span>
          <h1>
            Inteligencia sob medida.
            <br />
            <span>Automacao sem limites.</span>
          </h1>
          <p>
            Bots inteligentes, websites de alto desempenho e APIs personalizadas para escalar o seu negocio com
            qualidade visual, velocidade e presenca premium.
          </p>

          <div className="hero__actions">
            <Link href="/services" className="button button--primary">
              Conheca nossos servicos
              <ArrowIcon className="button__icon" />
            </Link>
            <Link href="/products" className="button button--ghost">
              Ver solucoes
            </Link>
          </div>

          <div className="stats-grid stats-grid--featured stagger-grid">
            {stats.map((stat, index) => {
              const Icon = statIcons[index] ?? BotIcon;

              return (
                <article key={stat.label} className="stat-card stat-card--featured">
                  <div className="stat-card__icon">
                    <Icon className="icon" />
                  </div>
                  <div>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="hero-visual hero-visual--reference fade-in reveal-delay-2">
          <div className="hero-visual__stars" />
          <div className="hero-visual__halo" />
          <div className="hero-visual__scene">
            <div className="hero-visual__emblem">
              <BrandMark compact />
            </div>
            <div className="hero-visual__pedestal">
              <div className="hero-visual__pedestal-ring" />
              <div className="hero-visual__pedestal-core" />
            </div>
          </div>
        </div>
      </section>

      <section className="container section">
        <SectionHeading
          eyebrow="Nossos servicos"
          title="Solucoes inteligentes para cada desafio"
          description="Projetamos experiencias digitais completas com visual premium, engenharia solida e foco claro em resultado."
        />

        <div className="feature-grid feature-grid--three stagger-grid">
          {services.map((service, index) => {
            const Icon = index === 0 ? BotIcon : index === 1 ? CodeIcon : DatabaseIcon;
            const variant = serviceMediaVariants[index] ?? "api";

            return (
              <article className="glass-card service-card service-card--reference" key={service.title}>
                <div className={`service-card__media service-card__media--${variant}`}>
                  <ServiceArtwork variant={variant} />
                </div>

                <div className="service-card__content">
                  <div className="service-card__icon">
                    <Icon className="icon" />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <Link href="/contact" className="service-card__link">
                    Saiba mais
                    <ArrowIcon className="button__icon" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container section">
        <div className="technology-strip glass-panel fade-up reveal-delay-1">
          <span className="eyebrow">Tecnologias que utilizamos</span>
          <div className="technology-strip__items">
            {technologies.map((tech) => (
              <span key={tech} className="technology-chip">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="glass-panel reason-panel fade-up">
          <SectionHeading
            eyebrow="Diferenciais"
            title="Por que escolher a Absolute?"
            description="Unimos tecnologia de ponta com estrategia para entregar solucoes que realmente fazem diferenca."
          />

          <div className="feature-grid feature-grid--four stagger-grid">
            {whyChooseUs.map((item, index) => {
              const Icon = index === 0 ? BoltIcon : index === 1 ? ShieldIcon : index === 2 ? CodeIcon : SupportIcon;

              return (
                <article className="reason-card" key={item.title}>
                  <div className="reason-card__icon">
                    <Icon className="icon" />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="cta-banner cta-banner--reference glass-panel fade-up">
          <div className="cta-banner__badge">
            <BrandMark compact />
          </div>

          <div className="cta-banner__copy">
            <h2>
              Pronto para transformar
              <br />
              sua ideia em <span>realidade?</span>
            </h2>
            <p>
              Fale com nosso time e descubra como a {siteConfig.name} pode levar seu projeto para o proximo nivel com
              execucao premium e suporte direto.
            </p>
          </div>

          <div className="cta-banner__actions">
            <Link href="/products" className="button button--primary">
              Ver solucoes
              <ArrowIcon className="button__icon" />
            </Link>
            <a href={siteConfig.discordUrl} className="button button--secondary" target="_blank" rel="noreferrer">
              Entrar no Discord
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
