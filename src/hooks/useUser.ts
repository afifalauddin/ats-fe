"use client";

import useAuth from "~/hooks/useAuth";
import axios, { type AxiosError } from "axios";
import { type User } from "~/types/user";
import { useRouter } from "next/navigation";
import { env } from "~/env";
import { type BaseResponse } from "~/types/api";

/**
 * Custom hook for user authentication and management.
 * Provides methods for login, logout, token management, and user profile data.
 */
const useUser = () => {
  const auth = useAuth();
  const router = useRouter();
  const apiClient = axios.create({
    baseURL: `${env.NEXT_PUBLIC_API_URL}`,
  });

  // Logs in a user with the provided tokens.
  const login = async (params: {
    accessToken: string;
    refreshToken: string;
  }) => {
    if (!params.accessToken || !params.refreshToken) {
      throw new Error("accessToken or refreshToken is not defined");
    }

    const { success } = await auth.setToken({
      accessToken: params.accessToken,
      refreshToken: params.refreshToken,
    });

    console.log("[ login ]", { success });

    return success;
  };

  /**
   * Retrieves the current authentication token.
   * Redirects to home page if no token is found.
   */
  const token = async () => {
    console.log("[ token ]");
    const { data } = await auth.getToken();

    console.log("[ token ] - fetched", { data: data });

    if (!data) {
      router.replace("/");
    }

    return data?.token;
  };

  //interceptor to add token to request headers
  apiClient.interceptors.request.use(async (config) => {
    console.log("[ interceptor ] - init");
    try {
      const accessToken = await token();
      console.log("[ interceptor ] - getting token", { accessToken });
      config.headers.Authorization = `Bearer ${accessToken}`;
    } catch (e) {
      console.error("[ intercepttor ] ", { e });
      router.replace("/");
    }
    return config;
  });

  const isLoggedIn = !!token;

  //fetch user data
  const profile = async () => {
    console.log("[ fetching user profile ]");
    const data = await apiClient
      .get<BaseResponse<User>>("/auth/me")
      .then((res) => res.data)
      .catch((err: AxiosError) => {
        console.error("Error fetching user profile", {
          error: err.stack,
        });
        return undefined;
      });
    return data;
  };

  const logout = async () => {
    console.log("[ logout ]");
    const { success } = await auth.deleteToken();
    console.log("[ logout ] - success", { success });

    router.replace("/");
  };

  return {
    login,
    token,
    isLoggedIn,
    apiClient,
    profile,
    logout,
  };
};

export default useUser;
