import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-shell">
      <section className="container section success-panel">
        <div className="glass-card success-card">
          <span className="eyebrow eyebrow--pill">404</span>
          <h1>Esta rota não foi encontrada.</h1>
          <p>Volte para a página inicial e continue explorando as soluções da Absolute.</p>
          <Link href="/" className="button button--primary">
            Ir para o início
          </Link>
        </div>
      </section>
    </div>
  );
}

