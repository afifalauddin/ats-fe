import { api } from "~/lib/utils";

const useAuth = () => {
  const setToken = async (params: {
    accessToken: string;
    refreshToken: string;
  }) => {
    const { accessToken, refreshToken } = params;
    return api<{
      success: boolean;
    }>("/api/login", {
      method: "POST",
      body: JSON.stringify({ accessToken, refreshToken }),
    });
  };

  const getToken = async () => {
    return api<{
      success: boolean;
      data: {
        token: string;
      };
    }>("/api/access", {
      method: "POST",
      cache: "no-cache",
    });
  };

  const deleteToken = () => {
    return api<{
      success: boolean;
    }>("/api/logout", {
      method: "POST",
    });
  };

  return {
    setToken,
    getToken,
    deleteToken,
  };
};

export default useAuth;
