"use client";

import { type FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { applicationFormSchema } from "~/types/application";
import { type z } from "zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useApplication } from "~/hooks/useApplication";

interface Props {
  id: number;
}

export const JobApplication: FC<Props> = ({ id }) => {
  const form = useForm<z.infer<typeof applicationFormSchema>>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      applicantName: "",
      applicantContactEmail: "",
      applicantContactPhone: "",
      resume: undefined,
    },
  });

  const { createApplication, pendingApplication } = useApplication({ id });

  const onSubmit = async (values: z.infer<typeof applicationFormSchema>) => {
    //validate if file is pdf
    if (values.resume instanceof FileList) {
      const file = values.resume[0];

      //no file found
      if (!file) {
        form.setError("resume", {
          type: "manual",
          message: "Resume is required",
        });
        return;
      }

      //invalid file type
      if (file?.type !== "application/pdf") {
        form.setError("resume", {
          type: "manual",
          message: "Resume must be a PDF file",
        });
        return;
      }
    }

    await createApplication(values);

    console.log({ id, values });
  };

  const fileRef = form.register("resume");

  return (
    <Card>
      <CardHeader>
        <h1 className="text-lg font-semibold">Job Application</h1>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="applicantName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription>Applicant full name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="applicantContactEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@gmail.com" {...field} />
                  </FormControl>
                  <FormDescription>Applicant email</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="applicantContactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone no</FormLabel>
                  <FormControl>
                    <Input placeholder="+123456789" {...field} />
                  </FormControl>
                  <FormDescription>Applicant phone number</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="resume"
              render={() => (
                <FormItem>
                  <FormLabel>Resume</FormLabel>
                  <FormControl>
                    <Input type="file" {...fileRef} />
                  </FormControl>
                  <FormDescription>Applicant resume</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={pendingApplication}>
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
