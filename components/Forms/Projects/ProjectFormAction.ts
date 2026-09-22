"use server";

import { submitForm } from "@/lib/supabase/Actions/submitForm";
import { FormStateBuilder } from "@/lib/utils/FormStateHelper";
import { getCleanProjectsData } from "@/lib/utils/getCleanValidatedData";
import { ProjectSchema } from "@/lib/zod/ProjectSchema";
import { ProjectSchemaError } from "@/types/SchemaErrorTypes";
import z from "zod";

export type ProjectInputType = z.infer<typeof ProjectSchema>;

export interface ProjectFormState {
  success: boolean;
  error: boolean;
  values?: ProjectInputType;
  message: string | ProjectSchemaError | undefined;
}

export const ProjectFormAction = async (
  _prevState: ProjectFormState,
  FormData: FormData,
): Promise<ProjectFormState> => {
  const Projects = getCleanProjectsData(FormData);
  if (Projects.state && Projects.state.error) return Projects.state;
  
  const saved = await submitForm(
    Projects.data?.isdraft ? "personal_projects_drafts" : "personal_projects",
    Projects.data,
  );

  if (!saved.success)
    return FormStateBuilder(false, true, "Failed to save form data");

  return FormStateBuilder(true, false, "New project added");
};
