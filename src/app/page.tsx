import Link from "next/link";

import { SectionHeading } from "@/components/ui/section-heading";
import { ArrowIcon, BoltIcon, BotIcon, CodeIcon, DatabaseIcon, ShieldIcon, SupportIcon } from "@/components/ui/icons";
import { catalog, services, siteConfig, stats, technologies, whyChooseUs } from "@/data/site";
import { formatCurrency } from "@/lib/utils";

export default function HomePage() {
  return (
    <div className="page-shell">
      <section className="container hero">
        <div className="hero__content fade-up">
          <span className="eyebrow eyebrow--pill">Tecnologia • Inovacao • Resultados</span>
          <h1>
            Inteligencia sob medida.
            <br />
            <span>Automacao sem limites.</span>
          </h1>
          <p>
            Bots inteligentes personalizados, websites de alto desempenho e APIs customizadas para escalar a sua
            operacao com sofisticacao, velocidade e seguranca.
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

          <div className="stats-grid stagger-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual glass-card fade-in reveal-delay-2">
          <div className="hero-visual__halo" />
          <div className="hero-visual__ring" />
          <div className="hero-visual__symbol">
            <div className="hero-visual__loop" />
            <div className="hero-visual__loop hero-visual__loop--secondary" />
            <div className="hero-visual__star" />
          </div>
          <div className="hero-visual__base" />
        </div>
      </section>

      <section className="container section">
        <SectionHeading
          eyebrow="Nossos servicos"
          title="Solucoes inteligentes para cada desafio"
          description="Projetamos experiencias digitais completas com design premium, engenharia solida e foco real em resultado."
        />

        <div className="feature-grid feature-grid--three stagger-grid">
          {services.map((service, index) => {
            const Icon = index === 0 ? BotIcon : index === 1 ? CodeIcon : DatabaseIcon;

            return (
              <article className="glass-card service-card" key={service.title}>
                <div className="service-card__icon">
                  <Icon className="icon" />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className="bullet-list">
                  {service.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <Link href="/contact" className="service-card__link">
                  {service.cta}
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container section">
        <div className="glass-panel technology-strip fade-up reveal-delay-1">
          <span className="eyebrow">Tecnologias que utilizamos</span>
          <div className="technology-strip__items">
            {technologies.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="glass-panel reason-panel fade-up">
          <SectionHeading
            eyebrow="Diferenciais"
            title="Por que escolher a Absolute?"
            description="Unimos tecnologia de ponta com estrategia para entregar solucoes que realmente mudam a forma como o seu negocio opera."
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
        <SectionHeading
          eyebrow="Produtos prontos"
          title="Acelere sua operacao com solucoes ja estruturadas"
          description="Escolha um pacote inicial e evolua com customizacoes, integracoes e suporte continuo."
          action={
            <Link href="/pricing" className="button button--ghost">
              Ver precos
            </Link>
          }
        />

        <div className="feature-grid feature-grid--three stagger-grid">
          {catalog.map((product) => (
            <article className="glass-card product-card" key={product.slug}>
              <span className="pill">{product.category}</span>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="product-card__footer">
                <strong>{formatCurrency(product.priceInCents)}</strong>
                <Link href="/products" className="service-card__link">
                  Comprar
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container section">
        <div className="cta-banner glass-panel fade-up">
          <div>
            <span className="eyebrow">Pronto para evoluir</span>
            <h2>Leve sua ideia para o proximo nivel com uma operacao digital premium.</h2>
            <p>
              Fale com o nosso time e descubra como a {siteConfig.name} pode transformar vendas, atendimento e
              produto em uma so estrategia.
            </p>
          </div>
          <div className="cta-banner__actions">
            <Link href="/contact" className="button button--primary">
              Solicitar proposta
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
