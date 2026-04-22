import type { Metadata } from "next";

import { AuthForm } from "@/components/forms/auth-form";

export const metadata: Metadata = {
  title: "Login"
};

export default async function LoginPage({
  searchParams
}: {
  searchParams?: Promise<{ next?: string }>;
}) {
  const params = searchParams ? await searchParams : undefined;

  return (
    <div className="page-shell auth-page">
      <section className="container auth-page__container">
        <div className="auth-page__grid">
          <div className="glass-panel auth-page__aside fade-up">
            <span className="eyebrow eyebrow--pill">Area do cliente</span>
            <h1>Entre para acompanhar pagamentos, pedidos e proximos passos sem ruido.</h1>
            <p>
              A experiencia de acesso agora conversa melhor com o restante do site e deixa onboarding, suporte e
              andamento do projeto muito mais claros logo de cara.
            </p>

            <div className="auth-page__spotlight fade-in reveal-delay-1">
              <strong>Visibilidade imediata</strong>
              <span>Status do pedido, contato com a equipe e confirmacoes no mesmo fluxo.</span>
            </div>

            <div className="auth-page__highlights stagger-grid">
              {[
                "Resumo direto do que foi comprado e do que vem depois.",
                "Acesso rapido ao Discord oficial e aos alinhamentos do projeto.",
                "Tela mais consistente com a identidade visual da Absolute."
              ].map((item) => (
                <article className="auth-page__detail" key={item}>
                  <span className="auth-page__detail-dot" />
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </div>

          <AuthForm mode="login" nextPath={params?.next} />
        </div>
      </section>
    </div>
  );
}
