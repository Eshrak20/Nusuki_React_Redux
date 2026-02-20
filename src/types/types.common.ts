export type TitleProps = {
  title: string;
};

// common API wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}
