"use server";

import { createClient } from "@/lib/supabase/server";

export type FormState = {
  success: boolean;
  message: string;
};

export const UpdatePublishAction = async (
  id: string,
  isDraft: boolean,
): Promise<FormState> => {
  if (!id)
    return {
      success: false,
      message: "Failed to update contact status",
    };
  const supabase = await createClient();
  const { error } = await supabase
    .from(isDraft ? "personal_blogs" : "personal_blogs_drafts")
    .update({ isdraft: isDraft, updated: new Date().toISOString() })
    .eq("id", id);

  if (error)
    return {
      success: false,
      message: error.message,
    };
  return {
    success: true,
    message: isDraft ? `Saved as draft` : `Journal published`,
  };
};
