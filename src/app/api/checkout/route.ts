import { NextResponse } from "next/server";

import { catalog } from "@/data/site";
import { createLocalOrder, isDatabaseUnavailableError, updateLocalOrder } from "@/lib/local-store";
import { createPagBankCheckout } from "@/lib/pagbank";
import { prisma } from "@/lib/prisma";
import { checkoutSchema } from "@/lib/validation";
import { getCurrentUser } from "@/server/auth";

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      {
        message: "Faca login para continuar.",
        loginUrl: "/login?next=/products"
      },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: parsed.error.issues[0]?.message ?? "Produto invalido." }, { status: 400 });
    }

    const productSeed = catalog.find((item) => item.slug === parsed.data.productSlug);

    if (!productSeed) {
      return NextResponse.json({ message: "Produto nao encontrado." }, { status: 404 });
    }

    let order:
      | {
          id: string;
          amountInCents: number;
          product: { name: string; slug: string };
        }
      | null = null;

    try {
      const product = await prisma.product.upsert({
        where: { slug: productSeed.slug },
        update: {
          name: productSeed.name,
          description: productSeed.description,
          shortDescription: productSeed.shortDescription,
          category: productSeed.category,
          priceInCents: productSeed.priceInCents,
          active: true,
          featured: productSeed.featured ?? false,
          badge: productSeed.badge
        },
        create: {
          slug: productSeed.slug,
          name: productSeed.name,
          description: productSeed.description,
          shortDescription: productSeed.shortDescription,
          category: productSeed.category,
          priceInCents: productSeed.priceInCents,
          active: true,
          featured: productSeed.featured ?? false,
          badge: productSeed.badge
        }
      });

      const createdOrder = await prisma.order.create({
        data: {
          userId: user.id,
          productId: product.id,
          amountInCents: product.priceInCents,
          status: "WAITING_PAYMENT",
          timeline: {
            createdAt: new Date().toISOString(),
            source: "website"
          }
        },
        include: {
          product: {
            select: {
              name: true,
              slug: true
            }
          }
        }
      });

      order = {
        id: createdOrder.id,
        amountInCents: createdOrder.amountInCents,
        product: createdOrder.product
      };
    } catch (error) {
      if (!isDatabaseUnavailableError(error)) {
        throw error;
      }

      const createdOrder = await createLocalOrder({
        userId: user.id,
        product: productSeed,
        amountInCents: productSeed.priceInCents,
        status: "WAITING_PAYMENT",
        timeline: {
          createdAt: new Date().toISOString(),
          source: "website"
        }
      });

      order = {
        id: createdOrder!.id,
        amountInCents: createdOrder!.amountInCents,
        product: {
          name: createdOrder!.product.name,
          slug: createdOrder!.product.slug
        }
      };
    }

    try {
      const checkout = await createPagBankCheckout({
        orderId: order.id,
        amountInCents: order.amountInCents,
        productName: order.product.name,
        productSlug: order.product.slug,
        customerName: user.name,
        customerEmail: user.email
      });

      try {
        await prisma.order.update({
          where: { id: order.id },
          data: {
            pagBankCheckoutId: checkout.checkoutId,
            checkoutUrl: checkout.checkoutUrl,
            status: "WAITING_PAYMENT",
            timeline: {
              lastCheckoutAt: new Date().toISOString(),
              checkoutStatus: checkout.checkoutStatus
            }
          }
        });
      } catch (error) {
        if (!isDatabaseUnavailableError(error)) {
          throw error;
        }

        await updateLocalOrder(order.id, {
          pagBankCheckoutId: checkout.checkoutId,
          checkoutUrl: checkout.checkoutUrl,
          status: "WAITING_PAYMENT",
          timeline: {
            lastCheckoutAt: new Date().toISOString(),
            checkoutStatus: checkout.checkoutStatus
          }
        });
      }

      return NextResponse.json({
        checkoutUrl: checkout.checkoutUrl
      });
    } catch (error) {
      try {
        await prisma.order.update({
          where: { id: order.id },
          data: {
            status: "FAILED",
            timeline: {
              lastFailureAt: new Date().toISOString(),
              message: error instanceof Error ? error.message : "Checkout failed"
            }
          }
        });
      } catch (updateError) {
        if (!isDatabaseUnavailableError(updateError)) {
          throw updateError;
        }

        await updateLocalOrder(order.id, {
          status: "FAILED",
          timeline: {
            lastFailureAt: new Date().toISOString(),
            message: error instanceof Error ? error.message : "Checkout failed"
          }
        });
      }

      return NextResponse.json(
        {
          message: "Nao foi possivel iniciar o checkout PagBank. Verifique a configuracao da integracao."
        },
        { status: 503 }
      );
    }
  } catch {
    return NextResponse.json({ message: "Erro interno ao criar checkout." }, { status: 500 });
  }
}
