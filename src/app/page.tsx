import Link from "next/link";

import { SectionHeading } from "@/components/ui/section-heading";
import { ArrowIcon, BoltIcon, BotIcon, CodeIcon, DatabaseIcon, ShieldIcon, SupportIcon } from "@/components/ui/icons";
import { catalog, services, siteConfig, stats, technologies, whyChooseUs } from "@/data/site";
import { formatCurrency } from "@/lib/utils";

export default function HomePage() {
  return (
    <div className="page-shell">
      <section className="container hero">
        <div className="hero__content">
          <span className="eyebrow eyebrow--pill">Tecnologia • Inovação • Resultados</span>
          <h1>
            Inteligência sob medida.
            <br />
            <span>Automação sem limites.</span>
          </h1>
          <p>
            Bots inteligentes personalizados, websites de alto desempenho e APIs customizadas para escalar a sua
            operação com sofisticação, velocidade e segurança.
          </p>

          <div className="hero__actions">
            <Link href="/services" className="button button--primary">
              Conheça nossos serviços
              <ArrowIcon className="button__icon" />
            </Link>
            <Link href="/products" className="button button--ghost">
              Ver soluções
            </Link>
          </div>

          <div className="stats-grid">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual glass-card">
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
          eyebrow="Nossos serviços"
          title="Soluções inteligentes para cada desafio"
          description="Projetamos experiências digitais completas com design premium, engenharia sólida e foco real em resultado."
        />

        <div className="feature-grid feature-grid--three">
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
        <div className="glass-panel technology-strip">
          <span className="eyebrow">Tecnologias que utilizamos</span>
          <div className="technology-strip__items">
            {technologies.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="glass-panel reason-panel">
          <SectionHeading
            eyebrow="Diferenciais"
            title="Por que escolher a Absolute?"
            description="Unimos tecnologia de ponta com estratégia para entregar soluções que realmente mudam a forma como o seu negócio opera."
          />

          <div className="feature-grid feature-grid--four">
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
          title="Acelere sua operação com soluções já estruturadas"
          description="Escolha um pacote inicial e evolua com customizações, integrações e suporte contínuo."
          action={
            <Link href="/pricing" className="button button--ghost">
              Ver preços
            </Link>
          }
        />

        <div className="feature-grid feature-grid--three">
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
        <div className="cta-banner glass-panel">
          <div>
            <span className="eyebrow">Pronto para evoluir</span>
            <h2>Leve sua ideia para o próximo nível com uma operação digital premium.</h2>
            <p>
              Fale com o nosso time e descubra como a {siteConfig.name} pode transformar vendas, atendimento e
              produto em uma só estratégia.
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
