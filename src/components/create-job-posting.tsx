"use client";

import { type FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { jobPostingFormSchema } from "~/types/job-posting";
import { useCreateJobPosting } from "~/hooks/useCreateJobPosting";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "~/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { Textarea } from "./ui/textarea";

export const CreateJobPosting: FC = () => {
  const form = useForm<z.infer<typeof jobPostingFormSchema>>({
    resolver: zodResolver(jobPostingFormSchema),
    defaultValues: {
      id: "",
      title: "",
      description: "",
      requirements: "",
      deadline: new Date(),
      keywords: [],
    },
  });

  const { createJobPosting, pendingJobPosting } = useCreateJobPosting();

  const onSubmit = async (values: z.infer<typeof jobPostingFormSchema>) => {
    await createJobPosting(values);
  };

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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="title" {...field} />
                  </FormControl>
                  <FormDescription>Job Posting title</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="description" {...field} />
                  </FormControl>
                  <FormDescription>Job Posting Description</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Requirements</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="# Requirements"
                      rows={10}
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    You can use markdown to format your text.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Application Deadline</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Application deadline, applicant can only see the posting
                    when it is in the future
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keywords</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2 rounded-md p-2">
                      <Input
                        placeholder={
                          field.value.length > 0
                            ? "Add more keywords"
                            : "Add keywords"
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === ",") {
                            e.preventDefault();
                            const value = e.currentTarget.value.trim();
                            if (value && !field.value.includes(value)) {
                              field.onChange([...field.value, value]);
                              e.currentTarget.value = "";
                            }
                          }
                        }}
                        onBlur={(e) => {
                          const value = e.currentTarget.value.trim();
                          if (value && !field.value.includes(value)) {
                            field.onChange([...field.value, value]);
                            e.currentTarget.value = "";
                          }
                        }}
                      />
                      {field.value.map((keyword, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-secondary-foreground"
                        >
                          <span>{keyword}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            onClick={() => {
                              const newKeywords = [...field.value];
                              newKeywords.splice(index, 1);
                              field.onChange(newKeywords);
                            }}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Enter keywords separated by Enter or comma
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={pendingJobPosting}>
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
