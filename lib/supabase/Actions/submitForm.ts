import { createClient } from "../server";

export const submitForm = async (
  table:
    | "personal_projects"
    | "personal_blogs"
    | "personal_blogs_drafts"
    | "personal_projects_drafts",
  payload: unknown,
) => {
  const supabase = await createClient();
  const { error } = await supabase.from(table).insert(payload as never);
  if (error) {
    console.error(error);
    return { success: false };
  }
  return { success: true };
};
