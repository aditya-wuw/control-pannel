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

interface ReturnJournalData {
  data?: JournalInputType;
  state?: FormState;
}
interface ReturnProjectData {
  data?: ProjectsType;
  state?: ProjectFormState;
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

export const getCleanProjectsData = (FormData: FormData): ReturnProjectData => {
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
  if (ValidFormData.image instanceof File) {
    constructImagePath = "store/" + (ValidFormData.image?.name ?? "");
  }
  constructImagePath = ValidFormData.image as string;
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
