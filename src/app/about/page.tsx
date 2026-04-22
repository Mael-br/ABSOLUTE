import type { Metadata } from "next";

import { brandNarrative } from "@/data/site";

export const metadata: Metadata = {
  title: "Sobre"
};

export default function AboutPage() {
  return (
    <div className="page-shell">
      <section className="container page-hero fade-up">
        <span className="eyebrow eyebrow--pill">Sobre a Absolute</span>
        <h1>Design, engenharia e automacao reunidos em uma marca de tecnologia premium.</h1>
        <p>
          Nossa proposta e transformar necessidades digitais complexas em produtos elegantes, rapidos e seguros,
          sempre com foco em impacto real para a operacao do cliente.
        </p>
      </section>

      <section className="container section">
        <div className="feature-grid feature-grid--three stagger-grid">
          <article className="glass-card narrative-card">
            <span className="eyebrow">Missao</span>
            <p>{brandNarrative.mission}</p>
          </article>
          <article className="glass-card narrative-card">
            <span className="eyebrow">Visao</span>
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
