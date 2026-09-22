"use server";

import { createClient } from "@/lib/supabase/server";

export const updateProjectsPublishAction = async (
  id: string,
  isdraft: boolean,
): Promise<boolean> => {
  if (!id) return false;
  const supabase = await createClient();
  console.log(isdraft);
  const { error } = await supabase
    .from(isdraft ? "personal_projects_drafts" : "personal_projects")
    .update({ isdraft: !isdraft })
    .eq("id", id);
  if (error) return false;
  return true;
};
