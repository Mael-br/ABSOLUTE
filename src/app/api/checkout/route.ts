import { NextResponse } from "next/server";

import { catalog } from "@/data/site";
import { createPagBankCheckout } from "@/lib/pagbank";
import { prisma } from "@/lib/prisma";
import { checkoutSchema } from "@/lib/validation";
import { getCurrentUser } from "@/server/auth";

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json(
      {
        message: "Faça login para continuar.",
        loginUrl: "/login?next=/products"
      },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const parsed = checkoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: parsed.error.issues[0]?.message ?? "Produto inválido." }, { status: 400 });
    }

    const productSeed = catalog.find((item) => item.slug === parsed.data.productSlug);

    if (!productSeed) {
      return NextResponse.json({ message: "Produto não encontrado." }, { status: 404 });
    }

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

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        productId: product.id,
        amountInCents: product.priceInCents,
        status: "WAITING_PAYMENT",
        timeline: {
          createdAt: new Date().toISOString(),
          source: "website"
        }
      }
    });

    try {
      const checkout = await createPagBankCheckout({
        orderId: order.id,
        amountInCents: product.priceInCents,
        productName: product.name,
        productSlug: product.slug,
        customerName: user.name,
        customerEmail: user.email
      });

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

      return NextResponse.json({
        checkoutUrl: checkout.checkoutUrl
      });
    } catch (error) {
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

      return NextResponse.json(
        {
          message: "Não foi possível iniciar o checkout PagBank. Verifique a configuração da integração."
        },
        { status: 503 }
      );
    }
  } catch {
    return NextResponse.json({ message: "Erro interno ao criar checkout." }, { status: 500 });
  }
}

