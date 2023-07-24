import { MyJWT, getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = req.nextUrl.pathname;
  console.log("Current path", path);

  if (path.startsWith('/_next/static')) {
    return NextResponse.next();
  }

  // If it's the root path, just render it
  if (path === "/") {
    return NextResponse.next();
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Cast token to MyJWT
  const session = token as MyJWT;

  if (session) {
    const { user } = session;
    console.log("Current user", user);

    if (session.isNewUser || !user || user.role === "GUEST") {
      if (path !== "/onboard") {
        return NextResponse.redirect(new URL("/onboard", req.url));
      }
    }
    // User is a merchant or an operator
    else if ((user.role === "MERCHANT" || user.role === "OPERATOR") && path !== "/protected/payments") {
      return NextResponse.redirect(new URL("/protected/payments", req.url));
    }
  } else if (path === "/protected" || path === "/onboard") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
