import type { PnrFormState } from "@/types/flight/myTravellers.types";

export const initialPnrFormState: PnrFormState = {
  travelers: [],

  contactPhone: "",
  contactEmail: "",

  sendBookingEmail: true,
  paymentMethod: "CK",
  receivedFrom: "NUSUKI WEB",

  saveTravellers: true,
};