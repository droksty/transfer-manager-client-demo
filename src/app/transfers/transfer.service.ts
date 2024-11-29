import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { TransferList } from "../_models/transfer-list.model";
import { Transfer } from "../_models/transfer.model";

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  API_URI: string = 'http://localhost:8080/transfers';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}


  insertTransfer(transfer: Transfer) {
    this.http.post<Transfer>(this.API_URI, transfer).subscribe(data => console.log(data));
  }

  updateTransfer(Transfer: Transfer) {
    return this.http.put<Transfer>(this.API_URI, Transfer);
  }

  deleteTransfer(id: number) {
    return this.http.delete(`${this.API_URI}/${id}`, { responseType: 'text' });
  }

  getTransferList() {
    const searchQuery = this.route.snapshot.queryParams;
    return this.http.get<TransferList>(this.API_URI, { params: searchQuery });
  }

  

  

  
}