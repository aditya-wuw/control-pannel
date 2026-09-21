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
