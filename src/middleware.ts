import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { env } from "./env";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get(env.TOKEN_NAME)?.value;
  console.log("[middleware]", {
    currentUser: !!currentUser,
  });

  if (!currentUser) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.redirect(new URL("/recruiter/dashboard", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/recruiter"],
};
