import { ResponseBuilder } from "@/types/database";

export const FormStateBuilder = (
  success: boolean,
  error: boolean,
  message: string,
) => {
  return {
    success: success,
    error: error,
    message: message,
  };
};

export const Response = <T = unknown>(
  success: boolean,
  message: string,
  data?: T,
): ResponseBuilder<T> => {
  return {
    success: success,
    message: message,
    data: data,
  };
};
