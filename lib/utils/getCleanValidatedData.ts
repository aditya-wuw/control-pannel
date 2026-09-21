import { JournalInputType } from "@/components/Forms/Journal/JournalUpdateAction";
import { JournalSchemaError } from "@/types/SchemaErrorTypes";
import { JournalSchema } from "../zod/JournalSchema";
import z from "zod";
import { FormState } from "@/components/Forms/Journal/JournalFormAction";

interface ReturnJournalData {
  data?: JournalInputType;
  state?: FormState;
}

export const getCleanJournalData = (FormData: FormData): ReturnJournalData => {
  const form = Object.fromEntries(FormData.entries());
  const ValidatedForm = JournalSchema.safeParse(form);
  if (!ValidatedForm.success) {
    const errors = z.treeifyError(ValidatedForm.error);
    console.log("Not validated");
    return {
      state: {
        success: false,
        error: true,
        values: form as JournalInputType,
        message: errors.properties as JournalSchemaError,
      },
    };
  }
  const ValidFormData = ValidatedForm.data;
  let constructBannerPath = "";
  if (ValidFormData.banner instanceof File) {
    constructBannerPath = "store/" + (ValidFormData.banner?.name ?? "");
    //handle the file upload and construct the accesable url
  }
  constructBannerPath = ValidFormData.banner as string;
  const { isdraft, ...Validdata } = ValidFormData;
  const Journal = {
    ...Validdata,
    banner: constructBannerPath,
    isdraft: isdraft === "Draft",
  };

  return { data: Journal };
};
