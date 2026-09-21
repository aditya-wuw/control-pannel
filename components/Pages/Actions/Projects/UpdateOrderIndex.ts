"use server";

import { createClient } from "@/lib/supabase/server";
import { ProjectsType } from "@/types/database";

interface State {
  success: boolean;
  message: string;
}

export const UpdateOrderIndex = async (
  items: ProjectsType[],
): Promise<State> => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("personal_projects")
    .upsert(items, { onConflict: "id" });

  if (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: false,
    message: "Order index updated!",
  };
};
