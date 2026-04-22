import { getBaseUrl, getPagBankConfig } from "@/lib/env";

type PagBankLink = {
  rel: string;
  href: string;
  method: string;
};

type PagBankCheckoutResponse = {
  id: string;
  reference_id: string;
  status: string;
  links?: PagBankLink[];
};

type CheckoutInput = {
  orderId: string;
  productName: string;
  productSlug: string;
  amountInCents: number;
  customerName: string;
  customerEmail: string;
};

export function mapPagBankChargeStatus(status?: string) {
  switch (status) {
    case "PAID":
      return "PAID";
    case "AUTHORIZED":
    case "IN_ANALYSIS":
      return "PROCESSING";
    case "WAITING":
      return "WAITING_PAYMENT";
    case "DECLINED":
    case "FAILED":
      return "FAILED";
    case "CANCELED":
      return "CANCELLED";
    case "REFUNDED":
      return "REFUNDED";
    default:
      return "WAITING_PAYMENT";
  }
}

export async function createPagBankCheckout(input: CheckoutInput) {
  const { apiUrl, token, webhookToken } = getPagBankConfig();

  if (!token) {
    throw new Error("PAGBANK_TOKEN is not configured.");
  }

  const baseUrl = getBaseUrl();
  const successUrl = `${baseUrl}/success?order=${input.orderId}`;
  const webhookUrl = `${baseUrl}/api/webhooks/pagbank?t=${encodeURIComponent(webhookToken)}`;
  const expirationDate = new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString();

  const response = await fetch(`${apiUrl}/checkouts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      reference_id: input.orderId,
      expiration_date: expirationDate,
      customer_modifiable: true,
      customer: {
        name: input.customerName,
        email: input.customerEmail
      },
      items: [
        {
          reference_id: input.productSlug,
          name: input.productName,
          quantity: 1,
          unit_amount: input.amountInCents
        }
      ],
      payment_methods: [
        { type: "CREDIT_CARD" },
        { type: "PIX" },
        { type: "BOLETO" }
      ],
      soft_descriptor: "ABSOLUTE TECH",
      redirect_url: successUrl,
      return_url: successUrl,
      notification_urls: [webhookUrl],
      payment_notification_urls: [webhookUrl]
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`PagBank checkout failed: ${error}`);
  }

  const payload = (await response.json()) as PagBankCheckoutResponse;
  const checkoutUrl = payload.links?.find((link) => link.rel === "PAY")?.href;

  if (!checkoutUrl) {
    throw new Error("PagBank checkout response did not include a PAY link.");
  }

  return {
    checkoutId: payload.id,
    checkoutStatus: payload.status,
    checkoutUrl
  };
}

