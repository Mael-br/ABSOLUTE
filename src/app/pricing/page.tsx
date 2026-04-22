import type { Metadata } from "next";
import Link from "next/link";

import { pricingPlans } from "@/data/site";

export const metadata: Metadata = {
  title: "Preços"
};

export default function PricingPage() {
  return (
    <div className="page-shell">
      <section className="container page-hero">
        <span className="eyebrow eyebrow--pill">Preços</span>
        <h1>Planos claros para iniciar, crescer e construir soluções de missão crítica.</h1>
        <p>
          Trabalhamos com pacotes de entrada e propostas sob medida, sempre alinhadas ao nível de customização,
          integração e prazo exigidos pelo projeto.
        </p>
      </section>

      <section className="container section">
        <div className="pricing-grid">
          {pricingPlans.map((plan) => (
            <article className={`glass-card pricing-card ${plan.recommended ? "pricing-card--featured" : ""}`} key={plan.name}>
              <span className="pill">{plan.recommended ? "Recomendado" : "Plano"}</span>
              <h2>{plan.name}</h2>
              <strong>{plan.price}</strong>
              <p>{plan.description}</p>
              <ul className="bullet-list">
                {plan.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <Link href="/contact" className="button button--primary button--full">
                {plan.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

