import { HttpClient } from "@angular/common/http";
import { Transfer } from "./transfer.interface";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Injectable()
export class TransferService {
  API_URL: string = 'http://localhost:8080/transfers';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}



  getTransferList() {
    const date = this.route.snapshot.queryParams;
    return this.http.get<Transfer[]>(this.API_URL, { params: date });
  }


  insertTransfer(transferDTO: Transfer) {
    this.http.post<Transfer>(this.API_URL, transferDTO).subscribe(data => console.log(data));
  }
}