"use server";
import { ResponseBuilder, TablesTypes } from "@/types/database";
import { createClient } from "../server";
import { Response } from "@/lib/utils/Helpers";

export const deleteSpecificRow = async (
  table: TablesTypes,
  rowId: string,
): Promise<ResponseBuilder> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from(table)
    .delete()
    .eq("id", rowId)
    .select("id")
    .single();

  if (error) {
    console.log(error);
    return Response(false, `${error.message}`);
  }

  const deletedId = data && data.id;
  return Response(true, `${deletedId} deleted`);
};
