import { JournalInputType } from "@/components/Forms/Journal/JournalUpdateAction";
import {
  JournalSchemaError,
  ProjectSchemaError,
} from "@/types/SchemaErrorTypes";
import { JournalSchema } from "../zod/JournalSchema";
import z from "zod";
import { FormState } from "@/components/Forms/Journal/JournalFormAction";
import { ProjectSchema } from "../zod/ProjectSchema";
import {
  ProjectFormState,
  ProjectInputType,
} from "@/components/Forms/Projects/ProjectFormAction";
import { ProjectsType } from "@/types/database";
import { uploadToPublicBucket } from "../supabase/Actions/uploadToPublicBucket";

interface ReturnJournalData {
  data?: JournalInputType;
  state?: FormState;
}
interface ReturnProjectData {
  data?: ProjectsType;
  state?: ProjectFormState;
}

const buildUniqueName = (initial: string): string => {
  const shortId = crypto.randomUUID().split("-")[0];
  const timeStamp = new Date().toISOString();
  const filename = `${initial}-${shortId}-${timeStamp}`;
  return filename;
};

export const getCleanJournalData = async (
  FormData: FormData,
): Promise<ReturnJournalData> => {
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
  constructBannerPath = ValidFormData.banner as string;
  console.log(constructBannerPath);
  if (ValidFormData.banner instanceof File && ValidFormData.banner.size != 0) {
    const filename = buildUniqueName(ValidFormData.banner.name);
    constructBannerPath = "store/" + filename;
    const success = await uploadToPublicBucket(filename, ValidFormData.banner);
    if (!success)
      return {
        state: {
          success: false,
          error: true,
          values: form as JournalInputType,
          message: "Failed to upload file",
        },
      };
  }
  const { isdraft, ...Validdata } = ValidFormData;
  const Journal = {
    ...Validdata,
    banner: constructBannerPath,
    isdraft: isdraft === "Draft",
  };

  return { data: Journal };
};

export const getCleanProjectsData = async (
  FormData: FormData,
): Promise<ReturnProjectData> => {
  const form = Object.fromEntries(FormData.entries());
  const ValidatedForm = ProjectSchema.safeParse(form);
  if (!ValidatedForm.success) {
    const errors = z.treeifyError(ValidatedForm.error);
    console.log("Not validated");
    return {
      state: {
        success: false,
        error: true,
        values: form as ProjectInputType,
        message: errors.properties as ProjectSchemaError,
      },
    };
  }
  const ValidFormData = ValidatedForm.data;
  let constructImagePath = "";
  constructImagePath = ValidFormData.image as string;

  if (ValidFormData.image instanceof File && ValidFormData.image.size != 0) {
    const filename = buildUniqueName(ValidFormData.image.name);
    constructImagePath = "store/" + filename;
    const success = await uploadToPublicBucket(filename, ValidFormData.image);
    if (!success)
      return {
        state: {
          success: false,
          error: true,
          values: form as ProjectInputType,
          message: "Failed to upload file",
        },
      };
  }
  const { githubLink, projectLiveUrl, videoDemo, isdraft, ...cleanData } =
    ValidFormData;

  const Projects = {
    ...cleanData,
    tags: ValidFormData.tags.split(","),
    links: [
      projectLiveUrl && {
        url: projectLiveUrl,
        label: "Demo",
      },
      githubLink && {
        url: githubLink,
        label: "Repo",
      },
    ],
    DemoVideo: videoDemo,
    image: constructImagePath,
    isdraft: isdraft === "Draft",
  } as ProjectsType;

  return { data: Projects };
};
