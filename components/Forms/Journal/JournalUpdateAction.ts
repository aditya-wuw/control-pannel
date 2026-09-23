"use server";

import { createClient } from "@/lib/supabase/server";
import { FormStateBuilder } from "@/lib/utils/Helpers";
import { getCleanJournalData } from "@/lib/utils/getCleanValidatedData";
import { JournalSchema } from "@/lib/zod/JournalSchema";
import { JournalType } from "@/types/database";
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

export const JournalUpdateAction = async (
  _prevState: FormState,
  FormData: FormData,
): Promise<FormState> => {
  const journal = await getCleanJournalData(FormData);

  if (journal.state && !journal.state.success) {
    return journal.state;
  }

  // console.log(journal.data);

  if (!journal.data)
    return FormStateBuilder(false, true, "Formdata wasn't provided");

  const { id, ...journaldata } = journal.data;
  const currentTime = new Date().toISOString();
  const Journal = { ...journaldata, updated: currentTime } as JournalType;

  if (!id) return FormStateBuilder(false, true, "Id wasn't provided");
  const supabase = await createClient();

  const { error } = await supabase
    .from(journal.data?.isdraft ? "personal_blogs_drafts" : "personal_blogs") //if not draft then it was a public post and can be updated
    .update(Journal)
    .eq("id", id);

  if (error) return FormStateBuilder(false, true, error.message);
  revalidatePath("/home/journals",'layout');
  return FormStateBuilder(true, false, "Journal updated");
};
