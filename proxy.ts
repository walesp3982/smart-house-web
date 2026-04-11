import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

const PUBLIC_ROUTES = ["/login", "/register", "/verify-email"];
const LANDING_PAGE = "/";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  const pathname = request.nextUrl.pathname;

  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  const isLandingPage = pathname === LANDING_PAGE;

  // 🔓 Sin token
  if (!token) {
    if (!isPublicRoute && !isLandingPage) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  // 🔐 Con token
  try {
    const decode = jwtDecode<{ exp?: number }>(token);
    const isExpired = decode.exp
      ? decode.exp * 1000 < Date.now()
      : true;

    if (isExpired) {
      const response = NextResponse.redirect(
        new URL("/login", request.url)
      );
      response.cookies.delete("access_token");
      return response;
    }
  } catch {
    const response = NextResponse.redirect(
      new URL("/login", request.url)
    );
    response.cookies.delete("access_token");
    return response;
  }

  // 🚫 Evitar redirección en verify-email
  if (token && isPublicRoute && !pathname.startsWith("/verify-email")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};