import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { TransferDTO, TransferListDTO } from "./transfer.interface";

@Injectable()
export class TransferService {
  API_URI: string = 'http://localhost:8080/transfers';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}


  insertTransfer(transferDTO: TransferDTO) {
    this.http.post<TransferDTO>(this.API_URI, transferDTO).subscribe(data => console.log(data));
  }

  updateTransfer(transferDTO: TransferDTO) {
    return this.http.put<TransferDTO>(this.API_URI, transferDTO);
  }

  deleteTransfer(id: number) {
    return this.http.delete(`${this.API_URI}/${id}`, { responseType: 'text' });
  }

  getTransferList() {
    const searchQuery = this.route.snapshot.queryParams;
    return this.http.get<TransferListDTO>(this.API_URI, { params: searchQuery });
  }

  

  

  
}