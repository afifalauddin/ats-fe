"use server";

import axios, { type AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { env } from "~/env";
import { stringToJSONSchema } from "~/lib/utils";
import { AuthSchema } from "~/types/auth";

// Handles the login process by setting the access token and refresh token in cookies.
export async function handleLogin(accessToken: string, refreshToken: string) {
  console.log("[ login ]", { accessToken, refreshToken });
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

  redirect("/");
}

// Handles the logout process by deleting the access token and refresh token from cookies.
export const handleLogout = async () => {
  (await cookies()).delete(env.TOKEN_NAME);

  redirect("/");
};

/**
 * Retrieves the access token from cookies.
 * If the access token is expired, attempts to refresh it using the refresh token.
 * Redirects to the login page if the token is invalid or expired and cannot be refreshed.
 *
 */
export const getAccessToken = async () => {
  console.log("[ access ] - init", { name: env.TOKEN_NAME });

  const appCookie = (await cookies()).get(env.TOKEN_NAME);

  console.log("[ access ] - cookie", { appCookie, name: env.TOKEN_NAME });

  if (!appCookie) {
    console.error("[ access ] - empty");
    redirect("/login");
  }

  console.log("[ access ] - got cookie", { cookieFound: appCookie.value });

  const parsedCookies = stringToJSONSchema.parse(appCookie.value);

  if (!parsedCookies) {
    //delete invalid token
    (await cookies()).delete(env.TOKEN_NAME);
    redirect("/login");
  }

  console.log("[ access ] - parsed data ", { parsedCookies: parsedCookies });

  //parse to AuthSchema
  const { accessToken, refreshToken } = AuthSchema.parse(parsedCookies);

  const { exp } = jwtDecode(accessToken);

  console.log("[ access ] - data ", { exp, accessToken, refreshToken });

  //check if its not valid
  if (!exp) {
    (await cookies()).delete(env.TOKEN_NAME);
    redirect("/login");
  }

  //check if token is expired
  const isAccessTokenExpired = Date.now() >= exp * 1000;

  console.log("[ access ] - expired check", {
    isAccessTokenExpired,
    dat: Date.now(),
    exp: exp * 1000,
  });

  if (isAccessTokenExpired) {
    try {
      const { token } = await axios
        .post<{
          token: string;
        }>(`${env.API_URL}/auth/refresh`, {
          refreshToken: refreshToken,
        })
        .then((res) => res.data)
        .catch((error: AxiosError) => {
          console.error("[ access ]- error", { error: error.stack });
          return {
            token: undefined,
          };
        });

      if (!token) {
        (await cookies()).delete(env.TOKEN_NAME);
        return NextResponse.json(
          {
            success: false,
            message: "Session Expired, Please login again",
          },
          {
            status: 400,
          },
        );
      }

      console.log("[ access ] - new access token", { token });

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

      return token;
    } catch (error) {
      console.error("[ access ] - error getting new token", { error });
      (await cookies()).delete(env.TOKEN_NAME);

      redirect("/login");
    }
  }
  //return the valid token
  return accessToken;
};
