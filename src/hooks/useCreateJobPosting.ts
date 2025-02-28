"use client";

import { useMutation } from "@tanstack/react-query";
import { type z } from "zod";

import { toast } from "sonner";

import { type BaseResponse } from "~/types/api";
import useUser from "./useUser";
import { type jobPostingFormSchema } from "~/types/job-posting";

import { useRouter } from "next/navigation";

/**
 * Custom hook for creating or updating job postings.
 * Provides functionality to submit job posting data and track submission status.
 *
 */

export const useCreateJobPosting = () => {
  const { apiClient } = useUser();
  const router = useRouter();

  const postApplication = async (
    formData: z.infer<typeof jobPostingFormSchema>,
  ) => {
    const { data } = await apiClient.post<BaseResponse<{ id: number }>>(
      "/posting",
      {
        title: formData.title,
        description: formData.description,
        requirements: formData.requirements,
        deadline: formData.deadline,
        keywords: formData.keywords,
        ...(formData.id && { id: formData.id }),
      },
    );
    return data;
  };

  /**
   * React Query mutation hook for handling the application submission
   * with success and error handling.
   */
  const { mutateAsync, isPending } = useMutation({
    mutationFn: postApplication,
    onMutate: (formData) => {
      console.log("onMutate", formData);
    },
    onSuccess: () => {
      toast.success("Job posting successfully created");

      //redirect to job posting list

      router.replace("/recruiter/dashboard");
    },
    onError: (error) => {
      console.error("Error creating job posting", { error });
      toast.error("Error creating job posting");
    },
  });

  return {
    createJobPosting: mutateAsync,
    pendingJobPosting: isPending,
  };
};
