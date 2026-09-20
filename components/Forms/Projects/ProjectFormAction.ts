"use server";

import { submitForm } from "@/lib/supabase/Actions/submitForm";
import { ProjectSchema } from "@/lib/zod/ProjectSchema";
import { ProjectSchemaError } from "@/types/SchemaErrorTypes";
import z from "zod";

export type ProjectType = z.infer<typeof ProjectSchema>;

export interface FormState {
  success: boolean;
  error: boolean;
  values?: ProjectType;
  message: string | ProjectSchemaError | undefined;
}

export const ProjectFormAction = async (
  _prevState: FormState,
  FormData: FormData,
): Promise<FormState> => {
  const form = Object.fromEntries(FormData.entries());
  const ValidatedForm = ProjectSchema.safeParse(form);
  if (!ValidatedForm.success) {
    const errors = z.treeifyError(ValidatedForm.error);
    console.log("Not validated");
    return {
      success: false,
      error: true,
      values: form as ProjectType,
      message: errors.properties as ProjectSchemaError,
    };
  }
  const ValidFormData = ValidatedForm.data;
  const constructImagePath = "store/" + (ValidFormData.image?.name ?? "");
  const { githubLink, projectLiveUrl, videoDemo, isdraft, ...cleanData } =
    ValidFormData;

  const Projects = {
    ...cleanData,
    tags: ValidFormData.tags.split(","),
    links: [
      projectLiveUrl && {
        url: projectLiveUrl,
        label: "Demo",
      },
      githubLink && {
        url: githubLink,
        label: "Repo",
      },
    ],
    DemoVideo: videoDemo,
    image: constructImagePath,
  };

  const saved = await submitForm(
    isdraft === "Draft" ? "personal_projects_drafts" : "personal_projects",
    Projects,
  );

  if (!saved.success)
    return {
      success: false,
      error: true,
      values: form as ProjectType,
      message: "Failed to save form to database",
    };

  const res = {
    success: true,
    error: false,
    values: undefined,
    message: "Form Submited",
  };
  return res;
};
