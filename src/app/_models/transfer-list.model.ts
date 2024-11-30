import { Transfer } from "./transfer.model";

/**
 * Μία TransferList ενθυλακώνει το αποτέλεσμα μίας αναζήτησης,
 * δηλαδή όλα τα transfer (βάση κριτηρίων της αναζήτησης) και τα οικονομικά τους σύνολα.
 */
export interface TransferList {
  transfers: Transfer[];
  totalSales: Number;
  totalNet: Number;
  totalCost: Number;
}
