"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: String(formData.get("name") ?? ""),
          email: String(formData.get("email") ?? ""),
          message: String(formData.get("message") ?? "")
        })
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        setError(result.message ?? "Não foi possível enviar sua mensagem.");
        return;
      }

      event.currentTarget.reset();
      setMessage(result.message ?? "Mensagem enviada com sucesso.");
    } catch {
      setError("Falha de conexão. Tente novamente em instantes.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="glass-card contact-form" onSubmit={handleSubmit}>
      <label className="field">
        <span>Nome</span>
        <input name="name" type="text" placeholder="Seu nome" required />
      </label>

      <label className="field">
        <span>E-mail</span>
        <input name="email" type="email" placeholder="voce@empresa.com" required />
      </label>

      <label className="field">
        <span>Descreva o projeto</span>
        <textarea name="message" placeholder="Conte o que você precisa construir, automatizar ou escalar." rows={6} required />
      </label>

      <button className="button button--primary" type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Enviar mensagem"}
      </button>

      {message ? <p className="form-feedback form-feedback--success">{message}</p> : null}
      {error ? <p className="form-feedback form-feedback--error">{error}</p> : null}
    </form>
  );
}

