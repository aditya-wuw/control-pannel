import * as z from "zod";

export const ProjectSchema = z.object({
  id: z.string().optional(),
  title: z.string().nonempty().max(60, "must be with in 60 characters"),
  Link: z.string().nonempty().max(40, "must be with in 40 characters"),
  tags: z
    .string()
    .regex(
      /^[^,]+(,\s*[^,]+)+$/,
      "must be a comma-separated list with at least two items",
    ),
  Description: z.string().nonempty().max(250, "must be with in 250 characters"),
  AdditionalDescription: z
    .string()
    .max(100, "must be with in 150 characters")
    .optional(),
  content: z.string().nonempty().max(2000, "must be with in 2000 characters"),
  projectLiveUrl: z.string().optional(),
  githubLink: z.string().optional(),
  videoDemo: z.string().optional(),
  image: z.file().or(z.string()).optional(),
  isdraft: z.string().nonoptional(),
});
