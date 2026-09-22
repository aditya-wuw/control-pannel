"use server";

import { createClient } from "@/lib/supabase/server";
import { FormStateBuilder } from "@/lib/utils/FormStateHelper";
import {
  getCleanJournalData,
  getCleanProjectsData,
} from "@/lib/utils/getCleanValidatedData";
import { JournalSchema } from "@/lib/zod/JournalSchema";
import { JournalType } from "@/types/database";
import {
  JournalSchemaError,
  ProjectSchemaError,
} from "@/types/SchemaErrorTypes";
import { revalidatePath } from "next/cache";
import z from "zod";
import { ProjectInputType } from "./ProjectFormAction";

export type JournalInputType = z.infer<typeof JournalSchema>;

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
  const Projects = getCleanProjectsData(FormData);
  if (Projects.state && Projects.state.error) return Projects.state;
  console.log(Projects.data);
  return FormStateBuilder(true, false, "Journal updated");
};
