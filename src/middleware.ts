import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Read token from cookies
  const token = req.cookies.get("token")?.value;

  // Routes you want to protect
  const protectedRoutes = ["/ambassador", "/university"];

  // Check if current request is a protected route
  if (protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
    // If no token, redirect to login
    if (!token) {
      const loginUrl = new URL("/", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next(); // allow access if token exists
}

export const config = {
  matcher: ["/ambassador/:path*", "/university/:path*"],
};
