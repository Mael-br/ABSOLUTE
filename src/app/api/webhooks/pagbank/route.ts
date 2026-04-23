import { NextResponse } from "next/server";

import { getPagBankConfig } from "@/lib/env";
import { findLocalOrderById, isDatabaseUnavailableError, updateLocalOrder } from "@/lib/local-store";
import { mapPagBankChargeStatus } from "@/lib/pagbank";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { webhookToken } = getPagBankConfig();
  const url = new URL(request.url);
  const requestToken = url.searchParams.get("t");

  if (!webhookToken || requestToken !== webhookToken) {
    return NextResponse.json({ message: "Unauthorized webhook." }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const charge = Array.isArray(payload.charges) ? payload.charges[0] : undefined;
    const referenceId =
      payload.reference_id ?? payload.order?.reference_id ?? charge?.reference_id ?? payload.referenceId;

    if (!referenceId) {
      return NextResponse.json({ message: "Missing reference id." }, { status: 400 });
    }

    let order: {
      id: string;
      pagBankCheckoutId?: string | null;
      pagBankChargeId?: string | null;
    } | null = null;

    try {
      order = await prisma.order.findUnique({
        where: { id: referenceId },
        select: {
          id: true,
          pagBankCheckoutId: true,
          pagBankChargeId: true
        }
      });
    } catch (error) {
      if (!isDatabaseUnavailableError(error)) {
        throw error;
      }

      order = await findLocalOrderById(referenceId);
    }

    if (!order) {
      return NextResponse.json({ message: "Order not found." }, { status: 200 });
    }

    try {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: mapPagBankChargeStatus(charge?.status ?? payload.status) as
            | "WAITING_PAYMENT"
            | "PROCESSING"
            | "PAID"
            | "FAILED"
            | "CANCELLED"
            | "REFUNDED",
          pagBankCheckoutId: payload.id ?? order.pagBankCheckoutId ?? undefined,
          pagBankChargeId: charge?.id ?? order.pagBankChargeId ?? undefined,
          timeline: {
            lastWebhookAt: new Date().toISOString(),
            checkoutStatus: payload.status ?? null,
            chargeStatus: charge?.status ?? null,
            paymentMethod: charge?.payment_method?.type ?? null
          }
        }
      });
    } catch (error) {
      if (!isDatabaseUnavailableError(error)) {
        throw error;
      }

      await updateLocalOrder(order.id, {
        status: mapPagBankChargeStatus(charge?.status ?? payload.status),
        pagBankCheckoutId: payload.id ?? order.pagBankCheckoutId ?? undefined,
        pagBankChargeId: charge?.id ?? order.pagBankChargeId ?? undefined,
        timeline: {
          lastWebhookAt: new Date().toISOString(),
          checkoutStatus: payload.status ?? null,
          chargeStatus: charge?.status ?? null,
          paymentMethod: charge?.payment_method?.type ?? null
        }
      });
    }

    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ message: "Webhook processing failed." }, { status: 500 });
  }
}

