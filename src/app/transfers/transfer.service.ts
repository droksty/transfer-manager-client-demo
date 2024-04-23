import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { TransferDTO } from "./transfer.interface";

@Injectable()
export class TransferService {
  API_URL: string = 'http://localhost:8080/transfers';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}


  getTransferList() {
    const searchQuery = this.route.snapshot.queryParams;
    return this.http.get<TransferDTO[]>(this.API_URL + (searchQuery.hasOwnProperty('date') ? '' : '/dates-between'), { params: searchQuery });
  }


  insertTransfer(transferDTO: TransferDTO) {
    this.http.post<TransferDTO>(this.API_URL, transferDTO).subscribe(data => console.log(data));
  }

  deleteTransfer(id: number) {
    return this.http.delete(`${this.API_URL}/${id}`, { responseType: 'text' });
    // return this.http.delete(`${this.API_URL}/${id}`);
  }

  updateTransfer(transferDTO: TransferDTO) {
    return this.http.put<TransferDTO>(this.API_URL, transferDTO);
  }
}