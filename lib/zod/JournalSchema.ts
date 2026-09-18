import * as z from "zod";

export const JournalSchema = z.object({
  title: z.string().nonempty().min(10).max(60),
  shortDescription: z.string().nonempty().min(20).max(250),
  content: z.string().nonempty().min(10).max(2000),
  banner: z.string().max(200).optional(),
  isdraft: z.boolean().nonoptional(),
});
