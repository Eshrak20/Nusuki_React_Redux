export type SocialLink = {
  id: number;
  platform: string;
  icon: string | null;
  url: string;
  is_active: boolean;
  position: number;
};


export type SocialLinksApiResponse = {
  success: boolean;
  message: string;
  data: SocialLink[];
};