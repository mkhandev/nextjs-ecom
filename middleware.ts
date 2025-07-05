//export { auth as middleware } from "@/auth";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
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

  return NextResponse.next();
}
