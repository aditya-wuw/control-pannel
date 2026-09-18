"use server";

export interface FormState {
  success: boolean;
  error: boolean;
  message: string;
}

export const ProjectFormAction = async (
  prevState: FormState,
  FormData: FormData,
): Promise<FormState> => {
  try {
    console.log(Object.fromEntries(FormData.entries()));
    const res: FormState = {
      success: true,
      error: false,
      message: "dadasdasdasghadasgh",
    };
    return res;
  } catch (error) {
    return {
      success: false,
      error: true,
      message: "An unexpected error occurred.",
    };
  }
};
