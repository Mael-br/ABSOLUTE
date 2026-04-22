"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type Mode = "login" | "signup";

export function AuthForm({ mode, nextPath = "/dashboard" }: { mode: Mode; nextPath?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload =
      mode === "signup"
        ? {
            name: String(formData.get("name") ?? ""),
            email: String(formData.get("email") ?? ""),
            password: String(formData.get("password") ?? "")
          }
        : {
            email: String(formData.get("email") ?? ""),
            password: String(formData.get("password") ?? "")
          };

    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setError(result.message ?? "Não foi possível concluir a autenticação.");
        return;
      }

      const target = nextPath.startsWith("/") ? nextPath : "/dashboard";
      window.location.href = target;
    } catch {
      setError("Falha de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="glass-card auth-form" onSubmit={handleSubmit}>
      <span className="eyebrow">{mode === "login" ? "Acesse sua conta" : "Crie sua conta"}</span>
      <h1>{mode === "login" ? "Entrar na Absolute" : "Comece sua jornada com a Absolute"}</h1>
      <p>
        {mode === "login"
          ? "Gerencie seus pedidos, acompanhe pagamentos e fale com o time em um só lugar."
          : "Cadastre-se para comprar soluções prontas, acompanhar pedidos e receber suporte dedicado."}
      </p>

      {mode === "signup" ? (
        <label className="field">
          <span>Nome</span>
          <input name="name" type="text" placeholder="Seu nome" autoComplete="name" required />
        </label>
      ) : null}

      <label className="field">
        <span>E-mail</span>
        <input name="email" type="email" placeholder="voce@empresa.com" autoComplete="email" required />
      </label>

      <label className="field">
        <span>Senha</span>
        <input
          name="password"
          type="password"
          placeholder={mode === "signup" ? "Mínimo de 8 caracteres" : "Sua senha"}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          required
        />
      </label>

      <button className="button button--primary button--full" disabled={loading} type="submit">
        {loading ? "Processando..." : mode === "login" ? "Entrar" : "Criar conta"}
      </button>

      {error ? <p className="form-feedback form-feedback--error">{error}</p> : null}

      <p className="auth-form__switch">
        {mode === "login" ? "Ainda não tem conta?" : "Já tem uma conta?"}{" "}
        <Link href={mode === "login" ? "/signup" : "/login"}>{mode === "login" ? "Cadastre-se" : "Entrar"}</Link>
      </p>
    </form>
  );
}
