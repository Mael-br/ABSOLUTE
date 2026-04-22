import type { Metadata } from "next";

import { PurchaseButton } from "@/components/ui/purchase-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { catalog } from "@/data/site";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Produtos"
};

export default function ProductsPage() {
  return (
    <div className="page-shell">
      <section className="container page-hero fade-up">
        <span className="eyebrow eyebrow--pill">Produtos</span>
        <h1>Escolha uma solucao pronta e evolua com personalizacoes sob medida.</h1>
        <p>
          Nossos produtos aceleram o inicio do projeto sem abrir mao de performance, design premium e arquitetura
          escalavel.
        </p>
      </section>

      <section className="container section">
        <SectionHeading
          eyebrow="Catalogo"
          title="Solucoes disponiveis para compra"
          description="Todos os produtos entram em checkout com PagBank e ficam disponiveis para acompanhamento no seu dashboard."
        />

        <div className="feature-grid feature-grid--three stagger-grid">
          {catalog.map((product) => (
            <article key={product.slug} className="glass-card product-card product-card--detailed">
              <div className="product-card__header">
                <span className="pill">{product.category}</span>
                {product.badge ? <span className="product-badge">{product.badge}</span> : null}
              </div>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <div className="product-card__footer product-card__footer--stacked">
                <strong>{formatCurrency(product.priceInCents)}</strong>
                <span>Pagamento seguro via PagBank</span>
              </div>
              <PurchaseButton productSlug={product.slug} />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
