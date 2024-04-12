import { HttpClient } from "@angular/common/http";
import { TransferDTO } from "./transfer.interface";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

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
}