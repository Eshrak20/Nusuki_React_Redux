type ApiErrorData = {
  success?: boolean;
  message?: string;
  code?: number;
  data?: Record<string, string[] | string>;
  errors?: Record<string, string[] | string>;
};

type ApiError = {
  status?: number;
  data?: ApiErrorData;
  message?: string;
};

const getFirstValidationError = (
  fieldErrors?: Record<string, string[] | string>,
) => {
  if (!fieldErrors) return null;

  const firstError = Object.values(fieldErrors)[0];

  if (Array.isArray(firstError)) {
    return firstError[0] || null;
  }

  if (typeof firstError === "string") {
    return firstError;
  }

  return null;
};

export const getApiErrorMessage = (
  error: unknown,
  fallback = "Something went wrong. Please try again.",
) => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "object" && error !== null) {
    const apiError = error as ApiError;

    const firstDataError = getFirstValidationError(apiError.data?.data);

    if (firstDataError) {
      return firstDataError;
    }

    const firstErrorsError = getFirstValidationError(apiError.data?.errors);

    if (firstErrorsError) {
      return firstErrorsError;
    }

    if (apiError.data?.message) {
      return String(apiError.data.message);
    }

    if (apiError.message) {
      return String(apiError.message);
    }
  }

  return fallback;
};

export type ApiFieldErrors<TForm> = Partial<Record<keyof TForm, string>>;

export const getApiFieldErrors = <TForm extends Record<string, unknown>>(
  error: unknown,
): ApiFieldErrors<TForm> => {
  if (typeof error !== "object" || error === null) return {};

  const apiError = error as ApiError;

  const fieldErrors = apiError.data?.data || apiError.data?.errors;

  if (!fieldErrors) return {};

  return Object.entries(fieldErrors).reduce<ApiFieldErrors<TForm>>(
    (acc, [field, messages]) => {
      const key = field as keyof TForm;

      if (Array.isArray(messages) && messages.length > 0) {
        acc[key] = messages[0];
      } else if (typeof messages === "string") {
        acc[key] = messages;
      }

      return acc;
    },
    {},
  );
};

export const hasApiFieldErrors = <TForm extends Record<string, unknown>>(
  errors: ApiFieldErrors<TForm>,
) => {
  return Object.keys(errors).length > 0;
};

export const getFirstApiFieldError = <TForm extends Record<string, unknown>>(
  errors: ApiFieldErrors<TForm>,
  fallback = "Please check your information.",
) => {
  return Object.values(errors)[0] || fallback;
};