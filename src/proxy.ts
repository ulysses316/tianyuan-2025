import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// export { default } from "next-auth/middleware";

export async function proxy(req: NextRequest) {
  const token = await getToken({ req });

  const { pathname } = req.nextUrl;

  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/curso", req.url));
  }

  if (!token && pathname === "/curso") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/curso", "/login"] };
