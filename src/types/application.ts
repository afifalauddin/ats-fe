import { z } from "zod";

export const applicationFormSchema = z.object({
  applicantName: z.string().min(1),
  applicantContactEmail: z.string().email(),
  // E.164 format
  applicantContactPhone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  resume: z.instanceof(FileList),
});
