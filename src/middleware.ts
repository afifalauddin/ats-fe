import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { env } from "./env";

export function middleware(request: NextRequest) {
  //check if token exist for authenticated user
  const currentUser = request.cookies.get(env.TOKEN_NAME)?.value;

  if (!currentUser) {
    //send to login page if no user is found
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //send to dashboard if user is found
  return NextResponse.redirect(new URL("/recruiter/dashboard", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/recruiter"],
};
