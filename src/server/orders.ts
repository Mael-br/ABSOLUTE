import { catalog } from "@/data/site";
import { getLocalOrdersForUser, findLocalOrderForUser, isDatabaseUnavailableError } from "@/lib/local-store";
import { prisma } from "@/lib/prisma";

export async function getFeaturedProducts() {
  return catalog
    .filter((product) => product.featured)
    .sort((left, right) => left.priceInCents - right.priceInCents);
}

export async function getProductBySlug(slug: string) {
  return catalog.find((product) => product.slug === slug) ?? null;
}

export async function getOrdersForUser(userId: string) {
  try {
    return await prisma.order.findMany({
      where: { userId },
      include: {
        product: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  } catch (error) {
    if (isDatabaseUnavailableError(error)) {
      return getLocalOrdersForUser(userId);
    }

    throw error;
  }
}

export async function getOrderForUser(orderId: string, userId: string) {
  try {
    return await prisma.order.findFirst({
      where: {
        id: orderId,
        userId
      },
      include: {
        product: true
      }
    });
  } catch (error) {
    if (isDatabaseUnavailableError(error)) {
      return findLocalOrderForUser(orderId, userId);
    }

    throw error;
  }
}
