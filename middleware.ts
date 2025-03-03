import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (
    (token && req.nextUrl.pathname.startsWith("/login")) ||
    req.nextUrl.pathname.startsWith("/signup")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
}

// Apply middleware only to the login page
export const config = {
  matcher: ["/login", "/signup"],
};
