"use client";

import { useState } from "react";

import { ArrowIcon } from "@/components/ui/icons";

export function PurchaseButton({
  productSlug,
  label = "Comprar agora",
  className
}: {
  productSlug: string;
  label?: string;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCheckout() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ productSlug })
      });

      const payload = (await response.json()) as {
        checkoutUrl?: string;
        message?: string;
        loginUrl?: string;
      };

      if (response.status === 401 && payload.loginUrl) {
        window.location.href = payload.loginUrl;
        return;
      }

      if (!response.ok || !payload.checkoutUrl) {
        setError(payload.message ?? "Não foi possível iniciar o checkout agora.");
        return;
      }

      window.location.href = payload.checkoutUrl;
    } catch {
      setError("Falha ao iniciar o checkout. Tente novamente em instantes.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="purchase-button">
      <button className={className ?? "button button--primary"} onClick={handleCheckout} type="button">
        <span>{loading ? "Abrindo checkout..." : label}</span>
        <ArrowIcon className="button__icon" />
      </button>
      {error ? <p className="form-feedback form-feedback--error">{error}</p> : null}
    </div>
  );
}
