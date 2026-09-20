"use server";
import { JournalSchemaError } from "@/types/SchemaErrorTypes";
import { FormState, JournalInputType } from "./JournalFormAction";
import { createClient } from "@/lib/supabase/server";
import { JournalType } from "@/types/database";

export const JournalUpdateAction = async (
  data: JournalType,
  id: string,
): Promise<FormState> => {
  if (!data)
    return {
      success: false,
      error: true,
      message: "no data was provided",
    };
  const supabase = await createClient();
  const { error } = await supabase
    .from(data.isdraft ? "personal_blogs_drafts" : "personal_blogs")
    .update(data)
    .eq("id", id);

  return {
    success: true,
    error: false,
    message: "Journal Updated",
  };
};
