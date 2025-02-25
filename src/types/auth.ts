import { z } from "zod";

export const AuthSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type AuthCookieObj = z.infer<typeof AuthSchema>;

export const Auth = () => AuthSchema;
