"use server";

import { JournalSchema } from "@/lib/zod/JournalSchema";
import { JournalSchemaError } from "@/types/SchemaErrorTypes";
import z from "zod";

type JournalType = z.infer<typeof JournalSchema>;

export interface FormState {
  success: boolean;
  error: boolean;
  values?: JournalType;
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
      values: form as JournalType,
      message: errors.properties as JournalSchemaError,
    };
  }
  const ValidFormData = ValidatedForm.data;
  const Journal = {
    ...ValidFormData,
    isdraft: ValidFormData.isdraft === "Draft" ? true : false,
    banner: ValidFormData.banner?.name ?? "",
  };

  console.log(Journal);
  const res = {
    success: true,
    error: false,
    values: undefined,
    message: "Form Submited",
  };
  return res;
};
