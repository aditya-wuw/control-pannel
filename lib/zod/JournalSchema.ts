import * as z from "zod";

export const JournalSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .nonempty()
    .max(60, { error: "must be a with in 60 characters" }),
  shortDescription: z
    .string()
    .nonempty()
    .max(250, { error: "must be a with in 250 characters" }),
  content: z
    .string()
    .nonempty()
    .max(2000, { error: "must be a with in 2000 characters" }),
  banner: z.file().or(z.string()).optional(),
  isdraft: z.string().or(z.boolean()).optional(),
});
