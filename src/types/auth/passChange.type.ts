export type ChangePasswordFormValues = {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
};

export const initialChangePasswordForm: ChangePasswordFormValues = {
  current_password: "",
  new_password: "",
  new_password_confirmation: "",
};