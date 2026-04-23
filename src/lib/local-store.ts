import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

import { Prisma } from "@prisma/client";

import type { ProductItem } from "@/data/site";

type LocalOrderStatus =
  | "PENDING"
  | "WAITING_PAYMENT"
  | "PAID"
  | "PROCESSING"
  | "DELIVERED"
  | "FAILED"
  | "CANCELLED"
  | "REFUNDED";

type StoredUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
};

type StoredOrder = {
  id: string;
  userId: string;
  status: LocalOrderStatus;
  amountInCents: number;
  currency: string;
  pagBankCheckoutId?: string | null;
  pagBankChargeId?: string | null;
  checkoutUrl?: string | null;
  timeline?: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
  product: ProductItem;
};

type StoredContactSubmission = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

type LocalStore = {
  users: StoredUser[];
  orders: StoredOrder[];
  contactSubmissions: StoredContactSubmission[];
};

const storePath = path.join(process.cwd(), "storage", "absolute-local-db.json");

const initialStore: LocalStore = {
  users: [],
  orders: [],
  contactSubmissions: []
};

function reviveUser(user: StoredUser | undefined | null) {
  if (!user) {
    return null;
  }

  return {
    ...user,
    createdAt: new Date(user.createdAt),
    updatedAt: new Date(user.updatedAt)
  };
}

function reviveOrder(order: StoredOrder | undefined | null) {
  if (!order) {
    return null;
  }

  return {
    ...order,
    createdAt: new Date(order.createdAt),
    updatedAt: new Date(order.updatedAt)
  };
}

async function ensureStoreFile() {
  await mkdir(path.dirname(storePath), { recursive: true });

  try {
    await readFile(storePath, "utf8");
  } catch {
    await writeFile(storePath, JSON.stringify(initialStore, null, 2), "utf8");
  }
}

async function readStore() {
  await ensureStoreFile();
  const raw = await readFile(storePath, "utf8");
  return JSON.parse(raw) as LocalStore;
}

async function writeStore(store: LocalStore) {
  await ensureStoreFile();
  await writeFile(storePath, JSON.stringify(store, null, 2), "utf8");
}

export function isDatabaseUnavailableError(error: unknown) {
  if (
    error instanceof Prisma.PrismaClientInitializationError ||
    error instanceof Prisma.PrismaClientUnknownRequestError
  ) {
    return true;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return ["P1001", "P2021", "P2022"].includes(error.code);
  }

  if (!(error instanceof Error)) {
    return false;
  }

  return (
    error.message.includes("Missing environment variable") ||
    error.message.includes("ECONNREFUSED") ||
    error.message.includes("connect to server") ||
    error.message.includes("Can`t reach database server") ||
    error.message.includes("Can't reach database server") ||
    error.message.includes("Schema engine error")
  );
}

export async function findLocalUserByEmail(email: string) {
  const store = await readStore();
  return reviveUser(store.users.find((user) => user.email === email));
}

export async function findLocalUserById(id: string) {
  const store = await readStore();
  return reviveUser(store.users.find((user) => user.id === id));
}

export async function createLocalUser(input: { name: string; email: string; passwordHash: string }) {
  const store = await readStore();
  const now = new Date().toISOString();

  const user: StoredUser = {
    id: randomUUID(),
    name: input.name,
    email: input.email,
    passwordHash: input.passwordHash,
    createdAt: now,
    updatedAt: now
  };

  store.users.push(user);
  await writeStore(store);

  return reviveUser(user);
}

export async function createLocalContactSubmission(input: { name: string; email: string; message: string }) {
  const store = await readStore();

  store.contactSubmissions.push({
    id: randomUUID(),
    name: input.name,
    email: input.email,
    message: input.message,
    createdAt: new Date().toISOString()
  });

  await writeStore(store);
}

export async function createLocalOrder(input: {
  userId: string;
  product: ProductItem;
  amountInCents: number;
  status: LocalOrderStatus;
  currency?: string;
  timeline?: Record<string, unknown>;
}) {
  const store = await readStore();
  const now = new Date().toISOString();

  const order: StoredOrder = {
    id: randomUUID(),
    userId: input.userId,
    product: input.product,
    amountInCents: input.amountInCents,
    status: input.status,
    currency: input.currency ?? "BRL",
    timeline: input.timeline ?? null,
    createdAt: now,
    updatedAt: now
  };

  store.orders.push(order);
  await writeStore(store);

  return reviveOrder(order);
}

export async function updateLocalOrder(
  id: string,
  patch: Partial<
    Pick<StoredOrder, "status" | "pagBankCheckoutId" | "pagBankChargeId" | "checkoutUrl" | "timeline" | "currency">
  >
) {
  const store = await readStore();
  const order = store.orders.find((item) => item.id === id);

  if (!order) {
    return null;
  }

  Object.assign(order, patch, {
    updatedAt: new Date().toISOString()
  });

  await writeStore(store);

  return reviveOrder(order);
}

export async function findLocalOrderById(id: string) {
  const store = await readStore();
  return reviveOrder(store.orders.find((order) => order.id === id));
}

export async function findLocalOrderForUser(orderId: string, userId: string) {
  const store = await readStore();
  return reviveOrder(store.orders.find((order) => order.id === orderId && order.userId === userId));
}

export async function getLocalOrdersForUser(userId: string) {
  const store = await readStore();

  return store.orders
    .filter((order) => order.userId === userId)
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
    .map((order) => reviveOrder(order))
    .filter((order): order is NonNullable<typeof order> => Boolean(order));
}
