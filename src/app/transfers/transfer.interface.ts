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


export interface FormValue {
  id?: number;
  pickupDate: Date;
  pickupTime: Date;
  passengerName: string;
  pax: number;
  type?: string;
  transferFrom: string;
  transferTo: string;
  priceTotal: number;
  priceNet: number;
  client: Client | null;
  provider: Provider | null;
  providerCost: number;
}

export interface SearchFormData {
  date: '';
  pickupDateFrom: '';
  pickupDateTo: '';
  clientTitle: '';
  providerName: '';
}

export class TransferDTO {
  id?: number;
  pickupDate: Date;
  pickupTime: Date;
  passengerName: string;
  pax: number;
  type?: string;
  transferFrom: string;
  transferTo: string;
  priceTotal: number;
  priceNet: number;
  client: Client | null;
  provider: Provider | null;
  providerCost: number;

  constructor(formValue: FormValue) {
    this.id = formValue.id;
    this.pickupDate = formValue.pickupDate;
    this.pickupTime = formValue.pickupTime;
    this.passengerName = formValue.passengerName;
    this.pax = formValue.pax;
    this.type = (!formValue.type) ? undefined : formValue.type;
    this.transferFrom = formValue.transferFrom;
    this.transferTo = formValue.transferTo;
    this.priceTotal = formValue.priceTotal;
    this.priceNet = formValue.priceNet;
    this.client = (!formValue.client) ? null : formValue.client;
    this.provider = (!formValue.provider) ? null : formValue.provider;
    this.providerCost = formValue.providerCost;
  }
}
