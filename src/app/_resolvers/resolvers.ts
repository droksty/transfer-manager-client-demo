import { ResolveFn } from "@angular/router";
import { inject } from "@angular/core";

import { TransferList } from "../_models/transfer-list.model";
import { TransferService } from "../_services/transfer.service";


export const fetchTransferList: ResolveFn<TransferList> = (activatedRouteSnapshot, routerStateSnapshot) => {
  // console.log('RESOLVE')
  if (activatedRouteSnapshot.queryParams['from'] === '') return { transfers: [], totalSales: 0, totalNet: 0, totalCost: 0 } as TransferList;
  
  const transferService = inject(TransferService);
  const transferList = transferService.getTransferList(activatedRouteSnapshot.queryParams);
  return transferList;
};