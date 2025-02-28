import { z } from "zod";

export const jobPostingFormSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  requirements: z.string(),
  deadline: z.coerce.date(),
  keywords: z.string().array(),
});

//infer the type of the jobPostingFormSchema
export type JobPostingForm = z.infer<typeof jobPostingFormSchema>;
