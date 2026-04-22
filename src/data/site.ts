import type { Route } from "next";

export type NavItem = {
  href: Route;
  label: string;
};

export type ServiceItem = {
  title: string;
  description: string;
  features: string[];
  cta: string;
};

export type ProductItem = {
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  category: string;
  priceInCents: number;
  badge?: string;
  featured?: boolean;
};

export type PricingPlan = {
  name: string;
  price: string;
  description: string;
  highlights: string[];
  cta: string;
  recommended?: boolean;
};

export const siteConfig = {
  name: "Absolute",
  description:
    "Absolute cria bots personalizados, websites de alto desempenho e APIs sob medida para marcas que querem operar em outro nível.",
  tagline: "Inteligência sob medida. Automação sem limites.",
  contactEmail: process.env.CONTACT_EMAIL ?? "contato@absolute.dev",
  discordUrl: process.env.DISCORD_INVITE_URL ?? "https://discord.gg/absolute",
  social: {
    instagram: "https://instagram.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    telegram: "https://t.me"
  }
};

export const navigation: NavItem[] = [
  { href: "/", label: "Início" },
  { href: "/services", label: "Serviços" },
  { href: "/products", label: "Produtos" },
  { href: "/pricing", label: "Preços" },
  { href: "/about", label: "Sobre" },
  { href: "/contact", label: "Contato" }
];

export const stats = [
  { value: "+150", label: "Bots entregues" },
  { value: "+200", label: "Projetos de websites" },
  { value: "+100", label: "APIs personalizadas" },
  { value: "98%", label: "Clientes satisfeitos" }
];

export const technologies = [
  "Node.js",
  "Python",
  "TypeScript",
  "React",
  "Next.js",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "AWS"
];

export const services: ServiceItem[] = [
  {
    title: "Bots Inteligentes",
    description:
      "Fluxos conversacionais com IA, integração com Discord, WhatsApp, Telegram e CRM para automatizar atendimento, suporte e vendas.",
    features: [
      "Atendimento 24/7 com IA treinada",
      "Integração com canais e ferramentas internas",
      "Dashboards e relatórios de performance"
    ],
    cta: "Solicitar bot"
  },
  {
    title: "Websites de Alto Padrão",
    description:
      "Sites institucionais, landing pages e portais com foco em velocidade, identidade premium, SEO e conversão.",
    features: [
      "Design estratégico e responsivo",
      "SEO técnico, analytics e performance",
      "Estrutura escalável e pronta para campanhas"
    ],
    cta: "Criar website"
  },
  {
    title: "APIs Personalizadas",
    description:
      "Arquiteturas seguras para automação, integração entre sistemas, produtos SaaS e backends críticos ao negócio.",
    features: [
      "Autenticação e autorização seguras",
      "Documentação e versionamento",
      "Observabilidade, filas e webhooks"
    ],
    cta: "Projetar API"
  }
];

export const whyChooseUs = [
  {
    title: "Alta Performance",
    description: "Soluções rápidas, otimizadas e prontas para escalar."
  },
  {
    title: "Segurança de Verdade",
    description: "Boas práticas, validação rigorosa e proteção desde a base."
  },
  {
    title: "Sob Medida",
    description: "Cada detalhe é calibrado para o seu processo e objetivo."
  },
  {
    title: "Suporte Especializado",
    description: "Acompanhamento próximo antes, durante e depois da entrega."
  }
];

export const catalog: ProductItem[] = [
  {
    slug: "bot-atendimento-premium",
    name: "Bot de Atendimento Premium",
    description:
      "Bot pronto para operar em Discord, WhatsApp e web com atendimento inteligente, qualificação de leads e comandos personalizados.",
    shortDescription: "Atendimento inteligente para vendas e suporte.",
    category: "Bots Inteligentes",
    priceInCents: 490000,
    badge: "Mais vendido",
    featured: true
  },
  {
    slug: "website-performance-pro",
    name: "Website Performance Pro",
    description:
      "Website premium com design autoral, SEO técnico, copy orientada à conversão e arquitetura pensada para performance.",
    shortDescription: "Presença digital premium pronta para converter.",
    category: "Websites",
    priceInCents: 690000,
    badge: "Launch ready",
    featured: true
  },
  {
    slug: "api-growth-stack",
    name: "API Growth Stack",
    description:
      "API robusta com autenticação, observabilidade, documentação e integrações sob medida para operações críticas.",
    shortDescription: "Backend seguro e escalável para automações e produtos.",
    category: "APIs",
    priceInCents: 890000,
    badge: "B2B",
    featured: false
  }
];

export const pricingPlans: PricingPlan[] = [
  {
    name: "Start",
    price: "A partir de R$ 4.900",
    description: "Para empresas que precisam validar rapidamente uma solução premium.",
    highlights: [
      "Escopo inicial orientado por estratégia",
      "Entrega enxuta com alto padrão visual",
      "Suporte de lançamento"
    ],
    cta: "Começar projeto"
  },
  {
    name: "Scale",
    price: "A partir de R$ 9.900",
    description: "Projetos mais completos com integrações, automações e arquitetura robusta.",
    highlights: [
      "Fluxos complexos e integrações externas",
      "Performance, SEO e observabilidade",
      "Prioridade no roadmap e suporte consultivo"
    ],
    cta: "Falar com especialista",
    recommended: true
  },
  {
    name: "Custom",
    price: "Sob consulta",
    description: "Para operações críticas, produtos proprietários e necessidades enterprise.",
    highlights: [
      "Discovery técnico e de negócio",
      "Arquitetura personalizada",
      "Acompanhamento contínuo"
    ],
    cta: "Solicitar orçamento"
  }
];

export const brandNarrative = {
  mission:
    "Construir soluções digitais premium que combinam inteligência, automação e performance para acelerar negócios ambiciosos.",
  vision:
    "Ser a parceira de tecnologia de referência para empresas que querem operar com sofisticação, velocidade e escala.",
  positioning:
    "A Absolute une design, engenharia e estratégia para transformar processos complexos em experiências digitais elegantes."
};
