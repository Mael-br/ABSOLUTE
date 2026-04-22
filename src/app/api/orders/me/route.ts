import { NextResponse } from "next/server";

import { getCurrentUser } from "@/server/auth";
import { getOrdersForUser } from "@/server/orders";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ message: "Não autenticado." }, { status: 401 });
  }

  const orders = await getOrdersForUser(user.id);
  return NextResponse.json({ orders });
}

