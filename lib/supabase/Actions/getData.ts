import { ErrorPromiose, TablesTypes } from "@/types/database";
import { createClient } from "../server";
import { Tables } from "@/database.types";

export const selectAll = async <T extends TablesTypes>(
  table: T,
): Promise<ErrorPromiose | Tables<T>[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase.from(table).select("*");
  if (error) {
    console.error(error);
    return {
      success: false,
      message: error.message,
    };
  }
  if (!data || data.length === 0)
    return {
      success: false,
      message: "nothing was found",
    };
  return data as Tables<T>[];
};
