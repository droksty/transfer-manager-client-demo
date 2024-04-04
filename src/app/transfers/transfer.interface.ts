export interface Transfer {
  id?: number;
  pickupDate: Date;
  pickupTime: Date;
  passengerName: string;
  pax: number;
  type?: string | null;
  transferFrom: string;
  transferTo: string;
  priceTotal: number;
  priceNet: number;
  client?: Client;
  provider?: Provider;
  providerCost: number;
}

export interface Client {
  id?: number;
  title?: string;
}

export interface Provider {
  id?: number;
  name?: string;
}
