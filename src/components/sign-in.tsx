"use client";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import useUser from "~/hooks/useUser";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { loginFormSchema } from "~/types/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import Link from "next/link";
import axios, { type AxiosError } from "axios";
import { env } from "~/env";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";
import { PasswordInput } from "~/components/ui/password";

const SignIn = () => {
  const router = useRouter();

  const { login } = useUser();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  useEffect(() => {
    const remember = localStorage.getItem("remember");
    const email = localStorage.getItem("email");

    if (remember === "true" && email) {
      form.setValue("email", email);
      form.setValue("rememberMe", true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    console.log(data);

    if (data.rememberMe) {
      localStorage.setItem("email", data.email);
      localStorage.setItem("remember", "true");
      //boolean to string
    } else {
      localStorage.removeItem("email");
      localStorage.removeItem("remember");
    }

    await axios
      .post<{
        success: boolean;
        data: {
          accessToken: string;
          refreshToken: string;
        };
      }>(`${env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email: data.email,
        password: data.password,
      })
      .then(async (res) => {
        const { accessToken, refreshToken } = res.data.data;

        if (accessToken && refreshToken) {
          await login({
            accessToken,
            refreshToken,
          }).then((status) => {
            if (status) {
              void router.push("/recruiter/dashboard");
            } else {
              void router.push("/");
            }
          });
        }
      })
      .catch(
        (
          err: AxiosError<{
            message: string;
          }>,
        ) => {
          toast(err.response?.data.message ?? "something went wrong", {
            dismissible: true,
          });
          console.error("[login.email]", {
            error: err.stack,
          });
        },
      )
      .finally(() => {
        console.log("[login.email] resetting");
        form.resetField("password");
      });
  };

  return (
    <div className="mx-auto w-full max-w-sm lg:w-96">
      <h2 className="text-light-50 mt-6 text-3xl font-extrabold">
        Sign in to your account
      </h2>

      <div className="mt-8">
        <Form {...form}>
          <form className="mt-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <Label
                            htmlFor="remember-me"
                            className="text-light-150"
                          >
                            Remember Me
                          </Label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  Sign in
                </Button>
              </div>
              <p className="text-light-150 mt-1 text-sm">
                Don&apos;t have an account?
                <Link href="/register"> Create Account</Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
