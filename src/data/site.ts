import type { Route } from "next";

import { getContactEmail, getDiscordUrl } from "@/lib/env";

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
    "Absolute cria bots personalizados, websites de alto desempenho e APIs sob medida para marcas que querem operar em outro nivel.",
  tagline: "Inteligencia sob medida. Automacao sem limites.",
  contactEmail: getContactEmail(),
  discordUrl: getDiscordUrl(),
  social: {
    instagram: "https://instagram.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    telegram: "https://t.me"
  }
};

export const navigation: NavItem[] = [
  { href: "/", label: "Inicio" },
  { href: "/services", label: "Servicos" },
  { href: "/products", label: "Produtos" },
  { href: "/pricing", label: "Precos" },
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
      "Fluxos conversacionais com IA, integracao com Discord, WhatsApp, Telegram e CRM para automatizar atendimento, suporte e vendas.",
    features: [
      "Atendimento 24/7 com IA treinada",
      "Integracao com canais e ferramentas internas",
      "Dashboards e relatorios de performance"
    ],
    cta: "Solicitar bot"
  },
  {
    title: "Websites de Alto Padrao",
    description:
      "Sites institucionais, landing pages e portais com foco em velocidade, identidade premium, SEO e conversao.",
    features: [
      "Design estrategico e responsivo",
      "SEO tecnico, analytics e performance",
      "Estrutura escalavel e pronta para campanhas"
    ],
    cta: "Criar website"
  },
  {
    title: "APIs Personalizadas",
    description:
      "Arquiteturas seguras para automacao, integracao entre sistemas, produtos SaaS e backends criticos ao negocio.",
    features: [
      "Autenticacao e autorizacao seguras",
      "Documentacao e versionamento",
      "Observabilidade, filas e webhooks"
    ],
    cta: "Projetar API"
  }
];

export const whyChooseUs = [
  {
    title: "Alta Performance",
    description: "Solucoes rapidas, otimizadas e prontas para escalar."
  },
  {
    title: "Seguranca de Verdade",
    description: "Boas praticas, validacao rigorosa e protecao desde a base."
  },
  {
    title: "Sob Medida",
    description: "Cada detalhe e calibrado para o seu processo e objetivo."
  },
  {
    title: "Suporte Especializado",
    description: "Acompanhamento proximo antes, durante e depois da entrega."
  }
];

export const catalog: ProductItem[] = [
  {
    slug: "bot-atendimento-premium",
    name: "Bot de Atendimento Premium",
    description:
      "Bot pronto para operar em Discord, WhatsApp e web com atendimento inteligente, qualificacao de leads e comandos personalizados.",
    shortDescription: "Atendimento inteligente para vendas e suporte.",
    category: "Bots Inteligentes",
    priceInCents: 290000,
    badge: "Mais vendido",
    featured: true
  },
  {
    slug: "website-performance-pro",
    name: "Website Performance Pro",
    description:
      "Website premium com design autoral, SEO tecnico, copy orientada a conversao e arquitetura pensada para performance.",
    shortDescription: "Presenca digital premium pronta para converter.",
    category: "Websites",
    priceInCents: 390000,
    badge: "Launch ready",
    featured: true
  },
  {
    slug: "api-growth-stack",
    name: "API Growth Stack",
    description:
      "API robusta com autenticacao, observabilidade, documentacao e integracoes sob medida para operacoes criticas.",
    shortDescription: "Backend seguro e escalavel para automacoes e produtos.",
    category: "APIs",
    priceInCents: 590000,
    badge: "B2B",
    featured: false
  }
];

export const pricingPlans: PricingPlan[] = [
  {
    name: "Start",
    price: "A partir de R$ 2.900",
    description: "Para empresas que precisam validar rapidamente uma solucao premium.",
    highlights: [
      "Escopo inicial orientado por estrategia",
      "Entrega enxuta com alto padrao visual",
      "Suporte de lancamento"
    ],
    cta: "Comecar projeto"
  },
  {
    name: "Scale",
    price: "A partir de R$ 5.900",
    description: "Projetos mais completos com integracoes, automacoes e arquitetura robusta.",
    highlights: [
      "Fluxos complexos e integracoes externas",
      "Performance, SEO e observabilidade",
      "Prioridade no roadmap e suporte consultivo"
    ],
    cta: "Falar com especialista",
    recommended: true
  },
  {
    name: "Custom",
    price: "Sob consulta",
    description: "Para operacoes criticas, produtos proprietarios e necessidades enterprise.",
    highlights: [
      "Discovery tecnico e de negocio",
      "Arquitetura personalizada",
      "Acompanhamento continuo"
    ],
    cta: "Solicitar orcamento"
  }
];

export const brandNarrative = {
  mission:
    "Construir solucoes digitais premium que combinam inteligencia, automacao e performance para acelerar negocios ambiciosos.",
  vision:
    "Ser a parceira de tecnologia de referencia para empresas que querem operar com sofisticacao, velocidade e escala.",
  positioning:
    "A Absolute une design, engenharia e estrategia para transformar processos complexos em experiencias digitais elegantes."
};
