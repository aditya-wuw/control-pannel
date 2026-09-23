"use server";
import {
  ErrorPromiose,
  PublicAssetsDataType,
  ResponseBuilder,
  TablesTypes,
} from "@/types/database";
import { createClient } from "../server";
import { Tables } from "@/database.types";
import { Response } from "@/lib/utils/Helpers";

export const selectAll = async <T extends TablesTypes>(
  table: T,
): Promise<ErrorPromiose | Tables<T>[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase.from(table).select("*");
  if (error) {
    console.error(error);
    return Response(false, error.message);
  }
  if (!data || data.length === 0) return Response(false, "nothing was found");
  return data as Tables<T>[];
};

export const getPublicAssets = async (): Promise<
  ResponseBuilder<PublicAssetsDataType[]>
> => {
  const supabase = await createClient();
  const { data: files, error } = await supabase
    .from("public_assets")
    .select("*");
  if (error) {
    console.log(`failed to fetch all public assets, Error : [${error}]`);
    return Response(false, error.message);
  }
  if (files.length === 0) {
    console.log(`failed to fetch all public assets, Error : [${error}]`);
    return Response(true, "Storage bucket is empty", []);
  }
  return Response(true, `Found ${files.length} public assets`, files);
};
