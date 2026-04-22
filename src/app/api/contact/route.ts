import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ message: parsed.error.issues[0]?.message ?? "Dados inválidos." }, { status: 400 });
    }

    await prisma.contactSubmission.create({
      data: parsed.data
    });

    return NextResponse.json({
      message: "Recebemos sua mensagem. Nosso time vai retornar em breve."
    });
  } catch {
    return NextResponse.json({ message: "Erro interno ao registrar contato." }, { status: 500 });
  }
}

