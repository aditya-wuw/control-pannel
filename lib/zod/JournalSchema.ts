import * as z from "zod";

export const JournalSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .nonempty()
    .min(10, { error: "must be a minimum of 10 characters" })
    .max(60, { error: "must be a with in 60 characters" }),
  shortDescription: z
    .string()
    .nonempty()
    .min(20, { error: "must be a minimum of 20 characters" })
    .max(250, { error: "must be a with in 250 characters" }),
  content: z
    .string()
    .nonempty()
    .min(100, { error: "must be a minimum of 100 characters" })
    .max(2000, { error: "must be a with in 2000 characters" }),
  banner: z.file().or(z.string()).optional(),
  isdraft: z.string().optional(),
});
