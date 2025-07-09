//export { auth as middleware } from "@/auth";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!request.cookies.get("sessionCartId")) {
    const sessionCartId = crypto.randomUUID();

    const newRequestHeaders = new Headers(request.headers);
    const response = NextResponse.next({
      request: {
        headers: newRequestHeaders,
      },
    });

    response.cookies.set("sessionCartId", sessionCartId);

    return response;
  }

  const protectedPaths = [
    /^\/shipping-address/,
    /^\/payment-method/,
    /^\/place-order/,
    /^\/profile/,
    /^\/user\/(.*)/,
    /^\/order\/(.*)/,
    /^\/admin/,
  ];

  const isProtected = protectedPaths.some((regex) => regex.test(pathname));

  if (isProtected) {
    const sessionToken =
      request.cookies.get("authjs.session-token")?.value ||
      request.cookies.get("__Secure-next-auth.session-token")?.value;

    if (!sessionToken) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }

  return NextResponse.next();
}
