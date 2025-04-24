import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // If the path starts with /en, redirect to the same path without /en
  if (path.startsWith("/en/") || path === "/en") {
    const newPath = path === "/en" ? "/" : path.slice(3);
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  // Handle authentication redirects
  const isPublicPath =
    path === "/auth/signin" || path === "/auth/signup" || path === "/";
  const isDashboardPath = path.startsWith("/dashboard");

  const token = request.cookies.get("next-auth.session-token")?.value;

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (isDashboardPath && !token) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
