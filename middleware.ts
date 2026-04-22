import { NextRequest, NextResponse } from "next/server";

import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

const protectedPagePrefixes = ["/dashboard"];
const protectedApiPrefixes = ["/api/checkout", "/api/orders"];
const guestOnlyPages = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  let isAuthenticated = false;

  if (token) {
    try {
      await verifySessionToken(token);
      isAuthenticated = true;
    } catch {
      isAuthenticated = false;
    }
  }

  const { pathname } = request.nextUrl;

  if (guestOnlyPages.some((page) => pathname.startsWith(page)) && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (protectedPagePrefixes.some((page) => pathname.startsWith(page)) && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (protectedApiPrefixes.some((page) => pathname.startsWith(page)) && !isAuthenticated) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup", "/api/checkout", "/api/orders/:path*"]
};

