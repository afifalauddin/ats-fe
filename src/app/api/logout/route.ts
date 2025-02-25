import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { env } from "~/env";

export async function POST() {
  //remove cookie
  (await cookies()).delete(env.TOKEN_NAME);

  return NextResponse.json(
    {
      success: true,
    },
    {
      status: 200,
    },
  );
}
