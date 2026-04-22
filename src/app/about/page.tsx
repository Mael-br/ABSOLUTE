import type { Metadata } from "next";

import { brandNarrative } from "@/data/site";

export const metadata: Metadata = {
  title: "Sobre"
};

export default function AboutPage() {
  return (
    <div className="page-shell">
      <section className="container page-hero">
        <span className="eyebrow eyebrow--pill">Sobre a Absolute</span>
        <h1>Design, engenharia e automação reunidos em uma marca de tecnologia premium.</h1>
        <p>
          Nossa proposta é transformar necessidades digitais complexas em produtos elegantes, rápidos e seguros,
          sempre com foco em impacto real para a operação do cliente.
        </p>
      </section>

      <section className="container section">
        <div className="feature-grid feature-grid--three">
          <article className="glass-card narrative-card">
            <span className="eyebrow">Missão</span>
            <p>{brandNarrative.mission}</p>
          </article>
          <article className="glass-card narrative-card">
            <span className="eyebrow">Visão</span>
            <p>{brandNarrative.vision}</p>
          </article>
          <article className="glass-card narrative-card">
            <span className="eyebrow">Posicionamento</span>
            <p>{brandNarrative.positioning}</p>
          </article>
        </div>
      </section>
    </div>
  );
}

