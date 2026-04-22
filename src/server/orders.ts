import { prisma } from "@/lib/prisma";

export async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: { active: true },
    orderBy: [{ featured: "desc" }, { priceInCents: "asc" }]
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug }
  });
}

export async function getOrdersForUser(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    include: {
      product: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });
}

export async function getOrderForUser(orderId: string, userId: string) {
  return prisma.order.findFirst({
    where: {
      id: orderId,
      userId
    },
    include: {
      product: true
    }
  });
}

