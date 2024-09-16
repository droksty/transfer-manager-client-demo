import { Associate } from './associate.model';

export interface Transfer {
  id?:            number;
  pickupDate:     Date;
  pickupTime:     Date;
  passengerName:  string;
  totalPax:       number;
  type?:          string;
  transferFrom:   string;
  transferTo:     string;
  priceTotal:     number;
  priceNet:       number;
  client:         Associate | null;
  operator:       Associate | null;
  operatorCost:   number;
}
