import type { Metadata } from "next";

import { AuthForm } from "@/components/forms/auth-form";

export const metadata: Metadata = {
  title: "Cadastro"
};

export default async function SignupPage({
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
            <span className="eyebrow eyebrow--pill">Cadastro rapido</span>
            <h1>Crie sua conta para comprar, acompanhar e evoluir seu projeto com mais fluidez.</h1>
            <p>
              O acesso agora abre a porta para checkout, historico, suporte e proximos marcos do projeto dentro de
              uma experiencia bem mais premium.
            </p>

            <div className="auth-page__spotlight fade-in reveal-delay-1">
              <strong>Comeco mais claro</strong>
              <span>Conta criada, checkout iniciado e suporte conectado sem etapas confusas.</span>
            </div>

            <div className="auth-page__highlights stagger-grid">
              {[
                "Compra de produtos pronta para seguir direto ao pagamento.",
                "Historico centralizado para manter briefing e entrega alinhados.",
                "Transicoes suaves e linguagem visual no mesmo nivel do restante do site."
              ].map((item) => (
                <article className="auth-page__detail" key={item}>
                  <span className="auth-page__detail-dot" />
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </div>

          <AuthForm mode="signup" nextPath={params?.next} />
        </div>
      </section>
    </div>
  );
}
