import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { createSessionToken, SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: parsed.error.issues[0]?.message ?? "Dados inválidos." }, { status: 400 });
    }

    const exists = await prisma.user.findUnique({
      where: { email: parsed.data.email.toLowerCase() }
    });

    if (exists) {
      return NextResponse.json({ message: "Este e-mail já está cadastrado." }, { status: 409 });
    }

    const user = await prisma.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email.toLowerCase(),
        passwordHash: await bcrypt.hash(parsed.data.password, 12)
      }
    });

    const token = await createSessionToken({
      sub: user.id,
      name: user.name,
      email: user.email
    });

    const response = NextResponse.json({ message: "Conta criada com sucesso." });
    response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions);
    return response;
  } catch {
    return NextResponse.json({ message: "Erro interno ao criar conta." }, { status: 500 });
  }
}

