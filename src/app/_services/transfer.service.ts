import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";

import { TransferList } from "../_models/transfer-list.model";
import { Transfer } from "../_models/transfer.model";

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  API_URI: string = 'http://localhost:8080/transfers';

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {}


  insertTransfer(transfer: Transfer) {
    return this.http.post<Transfer>(this.API_URI, transfer);
  }

  updateTransfer(Transfer: Transfer) {
    return this.http.put<Transfer>(this.API_URI, Transfer);
  }

  deleteTransfer(id: number) {
    return this.http.delete(`${this.API_URI}/${id}`, { responseType: 'text' });
  }

  // getTransferList() {
  //   const searchQuery = this.activatedRoute.snapshot.queryParams;
  //   return this.http.get<TransferList>(this.API_URI, { params: searchQuery });
  // }


  getTransferList(queryParams: Params) {
    return this.http.get<TransferList>(this.API_URI, { params: queryParams });
  }
}