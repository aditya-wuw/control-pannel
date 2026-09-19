import * as z from "zod";

export const ProjectSchema = z.object({
  title: z.string().nonempty().min(10).max(60),
  Link: z.string().nonempty().min(10).max(60),
  tags: z
    .string()
    .regex(
      /^[^,]+(,\s*[^,]+)+$/,
      "Must be a comma-separated list with at least two items",
    ),
  Description: z.string().nonempty().min(20).max(250),
  AdditionalDescription: z.string().min(20).max(100).optional(),
  content: z.string().nonempty().min(10).max(2000),
  projectLiveUrl: z.url(),
  githubLink: z.url(),
  videoDemo: z.url(),
  image: z.string().max(200).optional(),
  isdraft: z.boolean().nonoptional(),
});
