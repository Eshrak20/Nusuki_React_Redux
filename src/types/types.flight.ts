export interface FlightOffer {
  id: string;
  airline: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  discountPercent: number;
  isExclusive: boolean;
}

export interface FlightOffersResponse {
  success: boolean;
  data: FlightOffer[];
}
