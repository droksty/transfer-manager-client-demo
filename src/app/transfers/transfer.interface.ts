import { Associate } from "../_models/associate.model";

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
  client?: Associate;
  operator?: Associate;
  operatorCost: number;
}


export const TRANSFER_TYPES = [
  'SHARED', 'PRIVATE', 'VIP'
]

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
  client: Associate | null;
  operator: Associate | null;
  operatorCost: number;
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
  totalPax: number;
  type?: string;
  transferFrom: string;
  transferTo: string;
  priceTotal: number;
  priceNet: number;
  client: Associate | null;
  operator: Associate | null;
  operatorCost: number;

  constructor(formValue: FormValue) {
    this.id = formValue.id;
    this.pickupDate = formValue.pickupDate;
    this.pickupTime = formValue.pickupTime;
    this.passengerName = formValue.passengerName;
    this.totalPax = formValue.pax;
    this.type = (!formValue.type) ? undefined : formValue.type;
    this.transferFrom = formValue.transferFrom;
    this.transferTo = formValue.transferTo;
    this.priceTotal = formValue.priceTotal;
    this.priceNet = formValue.priceNet;
    this.client = (!formValue.client) ? null : formValue.client;
    this.operator = (!formValue.operator) ? null : formValue.operator;
    this.operatorCost = formValue.operatorCost;
  }
}
