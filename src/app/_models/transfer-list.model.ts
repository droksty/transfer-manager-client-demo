import { Transfer } from "./transfer.model";


export interface TransferList {
  transfers: Transfer[];
  totalSales: Number;
  totalNet: Number;
  totalCost: Number;
}
