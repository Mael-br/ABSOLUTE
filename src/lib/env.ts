const requiredServerVars = ["DATABASE_URL", "JWT_SECRET"] as const;

const developmentDefaults = {
  DATABASE_URL: "postgresql://postgres:postgres@localhost:5432/absolute",
  JWT_SECRET: "local-dev-secret",
  NEXT_PUBLIC_APP_URL: "http://localhost:3000",
  CONTACT_EMAIL: "absolute.tech.48@gmail.com",
  DISCORD_INVITE_URL: "https://discord.gg/tuazUaSdt"
} as const;

function getDevelopmentDefault(name: string) {
  return process.env.NODE_ENV !== "production"
    ? developmentDefaults[name as keyof typeof developmentDefaults]
    : undefined;
}

export function getRequiredEnv(name: (typeof requiredServerVars)[number] | string) {
  const value = process.env[name] ?? getDevelopmentDefault(name);

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export function getBaseUrl() {
  return process.env.NEXT_PUBLIC_APP_URL ?? developmentDefaults.NEXT_PUBLIC_APP_URL;
}

export function getDiscordUrl() {
  return process.env.DISCORD_INVITE_URL ?? developmentDefaults.DISCORD_INVITE_URL;
}

export function getContactEmail() {
  return process.env.CONTACT_EMAIL ?? developmentDefaults.CONTACT_EMAIL;
}

export function getDefaultDatabaseUrl() {
  return developmentDefaults.DATABASE_URL;
}

export function getPagBankConfig() {
  return {
    apiUrl: process.env.PAGBANK_API_URL ?? "https://sandbox.api.pagseguro.com",
    token: process.env.PAGBANK_TOKEN ?? "",
    webhookToken: process.env.PAGBANK_WEBHOOK_TOKEN ?? ""
  };
}

export function assertCoreEnv() {
  for (const name of requiredServerVars) {
    getRequiredEnv(name);
  }
}

