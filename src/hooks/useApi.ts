"use client";

import axios from "axios";
import { env } from "~/env";

/**
 * Custom hook that creates and provides an Axios client instance.
 * The client is pre-configured with the base URL from environment variables.
 *
 */

const useApi = () => {
  const client = axios.create({
    baseURL: `${env.NEXT_PUBLIC_API_URL}`,
  });

  return {
    client,
  };
};

export default useApi;
