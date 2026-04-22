import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/data/site";
import { formatCurrency } from "@/lib/utils";
import { getCurrentUser } from "@/server/auth";
import { getOrderForUser } from "@/server/orders";

export const metadata: Metadata = {
  title: "Sucesso"
};

export default async function SuccessPage({
  searchParams
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const params = await searchParams;
  const user = await getCurrentUser();
  const order = user && params.order ? await getOrderForUser(params.order, user.id) : null;

  return (
    <div className="page-shell">
      <section className="container section success-panel">
        <div className="glass-card success-card">
          <span className="eyebrow eyebrow--pill">Pagamento aprovado</span>
          <h1>
            Falta apenas um passo para o seu sonho ser realizado; contate-nos no nosso servidor do discord para
            finalizar o pedido.
          </h1>
          <p>
            Nossa equipe vai alinhar implementação, briefing e próximos passos assim que você entrar em contato com o
            suporte.
          </p>

          <div className="success-card__actions">
            <a href={siteConfig.discordUrl} className="button button--primary" target="_blank" rel="noreferrer">
              Entrar no Discord
            </a>
            <a href={`mailto:${siteConfig.contactEmail}`} className="button button--ghost">
              {siteConfig.contactEmail}
            </a>
          </div>

          <div className="success-summary">
            <h2>Resumo do pedido</h2>
            {order ? (
              <div className="success-summary__grid">
                <div>
                  <span>Produto</span>
                  <strong>{order.product.name}</strong>
                </div>
                <div>
                  <span>Status</span>
                  <strong>{order.status}</strong>
                </div>
                <div>
                  <span>Valor</span>
                  <strong>{formatCurrency(order.amountInCents)}</strong>
                </div>
                <div>
                  <span>Pedido</span>
                  <strong>{order.id}</strong>
                </div>
              </div>
            ) : (
              <p>Entre no dashboard para ver os detalhes do pedido assim que a confirmação for sincronizada.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
