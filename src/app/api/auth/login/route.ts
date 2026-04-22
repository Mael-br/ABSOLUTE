import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { createSessionToken, SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: parsed.error.issues[0]?.message ?? "Dados inválidos." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email.toLowerCase() }
    });

    if (!user) {
      return NextResponse.json({ message: "Credenciais inválidas." }, { status: 401 });
    }

    const matches = await bcrypt.compare(parsed.data.password, user.passwordHash);

    if (!matches) {
      return NextResponse.json({ message: "Credenciais inválidas." }, { status: 401 });
    }

    const token = await createSessionToken({
      sub: user.id,
      name: user.name,
      email: user.email
    });

    const response = NextResponse.json({ message: "Login realizado com sucesso." });
    response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions);
    return response;
  } catch {
    return NextResponse.json({ message: "Erro interno ao autenticar." }, { status: 500 });
  }
}

