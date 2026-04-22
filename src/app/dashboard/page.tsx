import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/data/site";
import { formatCurrency } from "@/lib/utils";
import { requireUser } from "@/server/auth";
import { getOrdersForUser } from "@/server/orders";

export const metadata: Metadata = {
  title: "Dashboard"
};

const statusLabels: Record<string, string> = {
  PENDING: "Pendente",
  WAITING_PAYMENT: "Aguardando pagamento",
  PAID: "Pago",
  PROCESSING: "Em processamento",
  DELIVERED: "Entregue",
  FAILED: "Falhou",
  CANCELLED: "Cancelado",
  REFUNDED: "Reembolsado"
};

export default async function DashboardPage() {
  const user = await requireUser();
  const orders = await getOrdersForUser(user.id);

  return (
    <div className="page-shell">
      <section className="container page-hero fade-up">
        <span className="eyebrow eyebrow--pill">Dashboard</span>
        <h1>Ola, {user.name}. Aqui esta o status das suas compras.</h1>
        <p>Acompanhe seus pedidos, historico de compras e entre em contato com o time sempre que precisar.</p>
      </section>

      <section className="container section">
        <div className="dashboard-grid stagger-grid">
          <article className="glass-card dashboard-card">
            <span className="eyebrow">Resumo</span>
            <h2>{orders.length} pedidos registrados</h2>
            <p>Seu historico e atualizado automaticamente conforme o PagBank confirma o pagamento.</p>
          </article>

          <article className="glass-card dashboard-card">
            <span className="eyebrow">Suporte</span>
            <h2>Fale com a equipe</h2>
            <p>Use o Discord oficial para agilizar alinhamentos, onboarding e entrega do pedido.</p>
            <a href={siteConfig.discordUrl} className="button button--secondary" target="_blank" rel="noreferrer">
              Abrir Discord
            </a>
          </article>
        </div>

        <div className="glass-card order-table fade-up reveal-delay-3">
          <div className="order-table__header">
            <h2>Historico de pedidos</h2>
            <Link href="/products" className="button button--ghost">
              Comprar mais
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="empty-state">
              <p>Voce ainda nao tem compras registradas.</p>
              <Link href="/products" className="button button--primary">
                Ver produtos
              </Link>
            </div>
          ) : (
            <div className="order-list">
              {orders.map((order) => (
                <article className="order-row" key={order.id}>
                  <div>
                    <span className="order-row__label">Pedido</span>
                    <strong>{order.product.name}</strong>
                  </div>
                  <div>
                    <span className="order-row__label">Valor</span>
                    <strong>{formatCurrency(order.amountInCents)}</strong>
                  </div>
                  <div>
                    <span className="order-row__label">Status</span>
                    <span className={`status-pill status-pill--${order.status.toLowerCase()}`}>
                      {statusLabels[order.status]}
                    </span>
                  </div>
                  <div>
                    <span className="order-row__label">Criado em</span>
                    <strong>{new Intl.DateTimeFormat("pt-BR").format(order.createdAt)}</strong>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
