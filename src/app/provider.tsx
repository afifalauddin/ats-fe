"use client";

import { type ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export interface Props {
  children: ReactNode;
}

const queryClient = new QueryClient();

const Provider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Provider;
