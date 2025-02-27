"use client";

import axios from "axios";
import { env } from "~/env";

const useApi = () => {
  const client = axios.create({
    baseURL: `${env.NEXT_PUBLIC_API_URL}`,
  });

  return {
    client,
  };
};

export default useApi;
