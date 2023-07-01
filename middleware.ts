import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;

  // If it's the root path, just render it
  if (path === "/") {
    return NextResponse.next();
  }

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session && path === "/protected") {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (session && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/protected", req.url));
  }

  // New: Check if the user has the necessary role to access the endpoint
  if (session && path === "/createOrder" && session.role !== "MERCHANT") {
    // The user is authenticated, but does not have the necessary role
    return NextResponse.json(
      { error: "Unauthorized", message: "You do not have the necessary role to access this endpoint" },
      { status: 401 }
    );
  }

  return NextResponse.next();
}
