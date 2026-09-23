"use server";

import { submitForm } from "@/lib/supabase/Actions/submitForm";
import { FormStateBuilder } from "@/lib/utils/Helpers";
import { getCleanJournalData } from "@/lib/utils/getCleanValidatedData";
import { JournalSchema } from "@/lib/zod/JournalSchema";
import { JournalSchemaError } from "@/types/SchemaErrorTypes";
import { revalidatePath } from "next/cache";
import z from "zod";

export type JournalInputType = z.infer<typeof JournalSchema>;

export interface FormState {
  success: boolean;
  error: boolean;
  values?: JournalInputType;
  message: string | JournalSchemaError | undefined;
}

export const JournalFormAction = async (
  _prevState: FormState,
  FormData: FormData,
): Promise<FormState> => {
  const journal = await getCleanJournalData(FormData);
  if (
    (journal.state && !journal.state.success) ||
    (!journal.data && journal.state)
  ) {
    return journal.state;
  }

  // console.log(journal.data?.isdraft);
  const saved = await submitForm(
    journal.data?.isdraft ? "personal_blogs_drafts" : "personal_blogs",
    journal.data,
  );

  if (!saved.success)
    return {
      ...FormStateBuilder(false, true, "Failed to save form data to database"),
      values: journal.data,
    };
  revalidatePath("/home/journals", "layout");
  return FormStateBuilder(true, false, "new Journal inserted");
};
