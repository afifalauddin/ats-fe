import { useMutation } from "@tanstack/react-query";
import { type z } from "zod";
import { type applicationFormSchema } from "~/types/application";

import { toast } from "sonner";

import useApi from "./useApi";
import { type BaseResponse } from "~/types/api";

interface Props {
  id: number;
}

export const useApplication = ({ id }: Props) => {
  const { client } = useApi();

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
  const { mutateAsync, isPending } = useMutation({
    mutationFn: postApplication,
    onMutate: (formData) => {
      console.log("onMutate", formData);
    },
    onSuccess: () => {
      toast.success("Application submitted successfully");
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
