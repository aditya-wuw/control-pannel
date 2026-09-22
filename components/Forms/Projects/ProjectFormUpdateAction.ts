"use server";

import { createClient } from "@/lib/supabase/server";
import { FormStateBuilder } from "@/lib/utils/FormStateHelper";
import { getCleanProjectsData } from "@/lib/utils/getCleanValidatedData";
import { ProjectSchemaError } from "@/types/SchemaErrorTypes";
import { ProjectInputType } from "./ProjectFormAction";
import { createServerClient } from "@supabase/ssr";

export interface FormState {
  success: boolean;
  error: boolean;
  values?: ProjectInputType;
  message: string | ProjectSchemaError | undefined;
}

export const ProjectUpdateAction = async (
  _prevState: FormState,
  FormData: FormData,
): Promise<FormState> => {
  const supabase = await createClient();
  const Projects = getCleanProjectsData(FormData);
  if (Projects.state && Projects.state.error) return Projects.state;
  console.log(Projects.data);
  if (!Projects.data) return FormStateBuilder(false, true, "data not found");
  const { id, ...ProjectData } = Projects.data;
  const { error } = await supabase
    .from(
      Projects.data.isdraft ? "personal_projects_drafts" : "personal_projects",
    )
    .update(ProjectData)
    .eq("id", id);
  if (error) return FormStateBuilder(false, true, error.message);
  return FormStateBuilder(true, false, "Journal updated");
};
