import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { createSessionToken, SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth";
import { createLocalUser, findLocalUserByEmail, isDatabaseUnavailableError } from "@/lib/local-store";
import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: parsed.error.issues[0]?.message ?? "Dados invalidos." }, { status: 400 });
    }

    const email = parsed.data.email.trim().toLowerCase();
    const name = parsed.data.name.trim();
    const passwordHash = await bcrypt.hash(parsed.data.password, 12);

    let user: { id: string; name: string; email: string } | null = null;

    try {
      const exists = await prisma.user.findUnique({
        where: { email }
      });

      if (exists) {
        return NextResponse.json({ message: "Este e-mail ja esta cadastrado." }, { status: 409 });
      }

      user = await prisma.user.create({
        data: {
          name,
          email,
          passwordHash
        },
        select: {
          id: true,
          name: true,
          email: true
        }
      });
    } catch (error) {
      if (!isDatabaseUnavailableError(error)) {
        throw error;
      }

      const exists = await findLocalUserByEmail(email);

      if (exists) {
        return NextResponse.json({ message: "Este e-mail ja esta cadastrado." }, { status: 409 });
      }

      const localUser = await createLocalUser({
        name,
        email,
        passwordHash
      });

      user = {
        id: localUser!.id,
        name: localUser!.name,
        email: localUser!.email
      };
    }

    const token = await createSessionToken({
      sub: user.id,
      name: user.name,
      email: user.email
    });

    const response = NextResponse.json({ message: "Conta criada com sucesso." });
    response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions);
    return response;
  } catch (error) {
    if (error instanceof Error && error.message.includes("Missing environment variable")) {
      return NextResponse.json(
        { message: "Configuracao do servidor incompleta. Revise o arquivo .env." },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Erro interno ao criar conta." }, { status: 500 });
  }
}
