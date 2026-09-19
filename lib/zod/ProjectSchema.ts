import * as z from "zod";

export const ProjectSchema = z.object({
  title: z
    .string()
    .nonempty()
    .min(10, "must be minium of 10 characters long")
    .max(60, "must be with in 60 characters"),
  Link: z
    .string()
    .nonempty()
    .min(10, "must be minium of 10 characters long")
    .max(40, "must be with in 60 characters"),
  tags: z
    .string()
    .regex(
      /^[^,]+(,\s*[^,]+)+$/,
      "must be a comma-separated list with at least two items",
    ),
  Description: z
    .string()
    .nonempty()
    .min(20, "must be minium of 20 characters long")
    .max(250, "must be with in 250 characters"),
  AdditionalDescription: z
    .string()
    .min(20, "must be minium of 20 characters long")
    .max(100, "must be with in 150 characters")
    .optional(),
  content: z
    .string()
    .nonempty()
    .min(100, "must be minium of 100 characters long")
    .max(2000, "must be with in 2000 characters"),
  projectLiveUrl: z.url().optional(),
  githubLink: z.url().optional(),
  videoDemo: z.url().optional(),
  image: z.string().optional(),
  isdraft: z.boolean().nonoptional(),
});
