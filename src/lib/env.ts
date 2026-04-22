const requiredServerVars = ["DATABASE_URL", "JWT_SECRET"] as const;

export function getRequiredEnv(name: (typeof requiredServerVars)[number] | string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export function getBaseUrl() {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

export function getDiscordUrl() {
  return process.env.DISCORD_INVITE_URL ?? "https://discord.gg/absolute";
}

export function getContactEmail() {
  return process.env.CONTACT_EMAIL ?? "contato@absolute.dev";
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

