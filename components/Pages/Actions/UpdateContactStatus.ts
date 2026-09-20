"use server";

import { createClient } from "@/lib/supabase/server";
import { status } from "@/types/ContactsPage";

export type FormState = {
  success: boolean;
  message: string;
};

export const UpdateContactAction = async (
  id: string,
  status: status,
): Promise<FormState> => {
  if (!id || !status)
    return {
      success: false,
      message: "Failed to update contact status",
    };
  const supabase = await createClient();
  const { error } = await supabase
    .from("contact_queries")
    .update({ status: status })
    .eq("id", id);
  if (error)
    return {
      success: false,
      message: error.message,
    };
  return {
    success: true,
    message: `updated contact status to ${status}`,
  };
};
