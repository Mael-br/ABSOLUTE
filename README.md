# Absolute

Website full-stack premium para venda de bots inteligentes, websites de alto desempenho e APIs personalizadas.

## Stack

- Next.js 15 + App Router + TypeScript
- PostgreSQL + Prisma
- JWT em cookie HttpOnly para autenticação
- Integração de checkout com PagBank

## Funcionalidades

- Landing page premium com visual futurista, glassmorphism e animações suaves
- Páginas institucionais de serviços, produtos, preços, sobre e contato
- Login e cadastro com hash seguro usando `bcryptjs`
- Dashboard protegido com histórico e status de pedidos
- Checkout PagBank com criação de pedido, redirecionamento e webhook
- Página `/success` com resumo do pedido e CTA para Discord
- SEO básico com metadata, sitemap e robots

## Setup

1. Instale as dependências:

```bash
npm install
```

2. Copie `.env.example` para `.env` e preencha:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/absolute"
JWT_SECRET="seu-segredo-forte"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
CONTACT_EMAIL="contato@absolute.dev"
DISCORD_INVITE_URL="https://discord.gg/absolute"
PAGBANK_API_URL="https://sandbox.api.pagseguro.com"
PAGBANK_TOKEN="seu-token-pagbank"
PAGBANK_WEBHOOK_TOKEN="segredo-do-webhook"
```

3. Gere o client Prisma, rode a migration e seed:

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

4. Inicie o projeto:

```bash
npm run dev
```

## PagBank

- O checkout é criado em `src/app/api/checkout/route.ts`.
- O webhook é recebido em `src/app/api/webhooks/pagbank/route.ts`.
- Configure no painel do PagBank a URL pública do webhook com o parâmetro `t` igual ao `PAGBANK_WEBHOOK_TOKEN`.
- O usuário é redirecionado para `/success?order=<id>` após concluir o pagamento.

Referências oficiais usadas para modelar a integração:

- https://developer.pagbank.com.br/reference/criar-checkout
- https://developer.pagbank.com.br/reference/webhooks-checkout

## Produção

- Use `NEXT_PUBLIC_APP_URL` com a URL final em HTTPS
- Gere um `JWT_SECRET` forte
- Publique o banco PostgreSQL em ambiente gerenciado
- Exponha a rota de webhook publicamente
- Adicione monitoramento, logs e rate limiting antes do deploy final

"# Absolute-v2" 
"# ABSOLUTE" 
