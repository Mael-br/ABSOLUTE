import type { Metadata } from "next";
import Link from "next/link";

import { ArrowIcon, BotIcon, CodeIcon, DatabaseIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/data/site";

export const metadata: Metadata = {
  title: "Servicos"
};

export default function ServicesPage() {
  return (
    <div className="page-shell">
      <section className="container page-hero fade-up">
        <span className="eyebrow eyebrow--pill">Servicos</span>
        <h1>Arquitetamos tecnologia premium para marcas que precisam de velocidade e escala.</h1>
        <p>
          Cada entrega combina design estrategico, engenharia solida e automacao inteligente para gerar impacto
          mensuravel no negocio.
        </p>
      </section>

      <section className="container section">
        <div className="stack-list stagger-grid">
          {services.map((service, index) => {
            const Icon = index === 0 ? BotIcon : index === 1 ? CodeIcon : DatabaseIcon;

            return (
              <article className="glass-card stack-item" key={service.title}>
                <div className="stack-item__meta">
                  <div className="service-card__icon">
                    <Icon className="icon" />
                  </div>
                  <div>
                    <span className="eyebrow">Especialidade</span>
                    <h2>{service.title}</h2>
                  </div>
                </div>
                <p>{service.description}</p>
                <ul className="bullet-list">
                  {service.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className="stack-item__cta">
                  <Link href="/contact" className="button button--primary">
                    {service.cta}
                    <ArrowIcon className="button__icon" />
                  </Link>
                  <span>Preco inicial ajustado conforme escopo, discovery e complexidade.</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container section">
        <SectionHeading
          eyebrow="Processo"
          title="Como construimos solucoes com previsibilidade"
          description="Um fluxo claro reduz risco tecnico, acelera entregas e mantem a experiencia premium do comeco ao fim."
        />
        <div className="feature-grid feature-grid--three stagger-grid">
          {[
            "Discovery tecnico e de negocio para mapear oportunidades e riscos.",
            "Prototipo e arquitetura definidos antes de entrar em producao.",
            "Entrega iterativa com validacao, QA, observabilidade e suporte."
          ].map((item, index) => (
            <article className="glass-card mini-card" key={item}>
              <span className="mini-card__index">0{index + 1}</span>
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
