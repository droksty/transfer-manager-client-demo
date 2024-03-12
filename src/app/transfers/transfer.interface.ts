export interface Transfer {
  id: number;
  date: Date;
  time: Date;
  passengerName: string;
  pax: number;
  type: string;
  transferFrom: string;
  transferTo: string;
  priceTotal: number;
  priceNet: number;
  client: Client;
}

export interface Client {
  id: number;
  title: string;
}
