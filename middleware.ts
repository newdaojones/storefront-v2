import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;
  console.log("Current path", path);

  // If it's the root path, just render it
  if (path === "/") {
    return NextResponse.next();
  }

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session && path === "/protected" || path === "/onboard") {
    return NextResponse.redirect(new URL("/", req.url));
  } else if (session && (path === "/protected" || path === "/onboard")) {
    return NextResponse.redirect(new URL("/protected/payments", req.url));
  }

  return NextResponse.next();
}
