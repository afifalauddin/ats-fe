import { useMutation } from "@tanstack/react-query";
import { type z } from "zod";
import { type applicationFormSchema } from "~/types/application";

import { toast } from "sonner";

import useApi from "./useApi";
import { type BaseResponse } from "~/types/api";

import { useRouter } from "next/navigation";

interface Props {
  id: number;
}

/**
 * Hook for handling job application submissions.
 * Provides functionality to create an application and track its loading state.
 */
export const useApplication = ({ id }: Props) => {
  const { client } = useApi();

  const router = useRouter();

  const postApplication = async (
    formData: z.infer<typeof applicationFormSchema>,
  ) => {
    const input = new FormData();
    input.append("applicantName", formData.applicantName);
    input.append("applicantContactPhone", formData.applicantContactPhone);
    input.append("applicantContactEmail", formData.applicantContactEmail);

    //@ts-expect-error - should already been validated
    input.append("resume", formData.resume[0]);

    const { data } = await client.post<BaseResponse<{ id: number }>>(
      `/application/${id}`,
      input,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
      toast.success("Application submitted successfully");

      router.replace("/recruiter/dashboard");
    },
    onError: (error) => {
      console.error("Error submitting application", { error });
      toast.error("Error submitting application");
    },
  });

  return {
    createApplication: mutateAsync,
    pendingApplication: isPending,
  };
};
