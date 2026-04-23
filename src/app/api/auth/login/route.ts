import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { createSessionToken, SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth";
import { findLocalUserByEmail, isDatabaseUnavailableError } from "@/lib/local-store";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: parsed.error.issues[0]?.message ?? "Dados invalidos." }, { status: 400 });
    }

    const email = parsed.data.email.trim().toLowerCase();
    let user: { id: string; name: string; email: string; passwordHash: string } | null = null;

    try {
      user = await prisma.user.findUnique({
        where: { email }
      });
    } catch (error) {
      if (!isDatabaseUnavailableError(error)) {
        throw error;
      }

      user = await findLocalUserByEmail(email);
    }

    if (!user) {
      return NextResponse.json({ message: "Credenciais invalidas." }, { status: 401 });
    }

    const matches = await bcrypt.compare(parsed.data.password, user.passwordHash);

    if (!matches) {
      return NextResponse.json({ message: "Credenciais invalidas." }, { status: 401 });
    }

    const token = await createSessionToken({
      sub: user.id,
      name: user.name,
      email: user.email
    });

    const response = NextResponse.json({ message: "Login realizado com sucesso." });
    response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions);
    return response;
  } catch (error) {
    if (error instanceof Error && error.message.includes("Missing environment variable")) {
      return NextResponse.json(
        { message: "Configuracao do servidor incompleta. Revise o arquivo .env." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Erro interno ao autenticar." }, { status: 500 });
  }
}
