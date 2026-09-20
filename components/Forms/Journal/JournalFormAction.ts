"use server";

import { submitForm } from "@/lib/supabase/Actions/submitForm";
import { JournalSchema } from "@/lib/zod/JournalSchema";
import { JournalSchemaError } from "@/types/SchemaErrorTypes";
import z from "zod";

export type JournalInputType = z.infer<typeof JournalSchema>;

export interface FormState {
  success: boolean;
  error: boolean;
  values?: JournalInputType;
  message: string | JournalSchemaError | undefined;
}

export const JournalFormAction = async (
  _prevState: FormState,
  FormData: FormData,
): Promise<FormState> => {
  const form = Object.fromEntries(FormData.entries());
  const ValidatedForm = JournalSchema.safeParse(form);
  if (!ValidatedForm.success) {
    const errors = z.treeifyError(ValidatedForm.error);
    console.log("Not validated");
    return {
      success: false,
      error: true,
      values: form as JournalInputType,
      message: errors.properties as JournalSchemaError,
    };
  }
  const ValidFormData = ValidatedForm.data;
  let constructBannerPath = "";
  if (ValidFormData.banner instanceof File) {
    constructBannerPath = "store/" + (ValidFormData.banner?.name ?? "");
  }
  constructBannerPath = ValidFormData.banner as string;
  const { isdraft, ...cleanData } = ValidFormData;
  const Journal = {
    ...cleanData,
    banner: constructBannerPath,
  };
  const saved = await submitForm(
    isdraft === "Draft" ? "personal_blogs_drafts" : "personal_blogs",
    Journal,
  );

  if (!saved.success)
    return {
      success: false,
      error: true,
      values: form as JournalInputType,
      message: "Failed to save form data to database",
    };

  const res = {
    success: true,
    error: false,
    values: undefined,
    message: "Form Submited",
  };

  return res;
};
