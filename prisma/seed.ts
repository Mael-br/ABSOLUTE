import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    slug: "bot-atendimento-premium",
    name: "Bot de Atendimento Premium",
    description:
      "Bot multicanal com IA, roteamento inteligente e fluxos personalizados para atendimento, qualificação e pós-venda.",
    shortDescription: "Atendimento inteligente para Discord, WhatsApp e web.",
    category: "Bots Inteligentes",
    priceInCents: 490000,
    featured: true,
    badge: "Mais vendido",
    metadata: {
      delivery: "7 a 14 dias",
      stack: ["Node.js", "OpenAI", "Discord", "WhatsApp"]
    }
  },
  {
    slug: "website-performance-pro",
    name: "Website Performance Pro",
    description:
      "Website institucional premium com SEO técnico, copy estratégica, animações refinadas e foco em conversão.",
    shortDescription: "Presença digital de alto padrão e carregamento veloz.",
    category: "Websites",
    priceInCents: 690000,
    featured: true,
    badge: "Launch ready",
    metadata: {
      delivery: "10 a 21 dias",
      stack: ["Next.js", "TypeScript", "SEO", "Analytics"]
    }
  },
  {
    slug: "api-growth-stack",
    name: "API Growth Stack",
    description:
      "API segura, documentada e escalável com autenticação, observabilidade, webhooks e integrações sob medida.",
    shortDescription: "Backends robustos para produtos e automações críticas.",
    category: "APIs",
    priceInCents: 890000,
    featured: false,
    badge: "B2B",
    metadata: {
      delivery: "14 a 28 dias",
      stack: ["Node.js", "PostgreSQL", "Docker", "Cloud"]
    }
  }
];

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

