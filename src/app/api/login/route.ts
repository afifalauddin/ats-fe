import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { env } from "~/env";

export async function POST(request: Request) {
  const requestBody = (await request.json()) as {
    accessToken: string;
    refreshToken: string;
  };

  const { accessToken, refreshToken } = requestBody;

  const cookieObj = JSON.stringify({
    accessToken,
    refreshToken,
  });

  (await cookies()).set(env.TOKEN_NAME, cookieObj, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "strict",
    path: "/",
  });

  return NextResponse.json(
    {
      success: true,
    },
    {
      status: 200,
    },
  );
}
