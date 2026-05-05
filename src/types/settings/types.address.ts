export type Address = {
  id: number;
  title: string | null;
  address: string;
  google_map_embed: string | null;
  is_active: boolean;
  position: number;
};

export type AddressesApiResponse = {
  success: boolean;
  message: string;
  data: Address[];
};