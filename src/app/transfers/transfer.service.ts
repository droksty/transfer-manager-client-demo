import { HttpClient } from "@angular/common/http";
import { Transfer } from "./transfer.interface";
import { Injectable } from "@angular/core";

@Injectable()
export class TransferService {
  API_URL: string = 'http://localhost:8080/transfers';
  testdate: string = '?date=2024-05-01'       // TEST ONLY

  constructor(private http: HttpClient) {}

  getTransferList() {
    this.http.get<Transfer[]>(this.API_URL + this.testdate).subscribe(transferList => console.log(transferList));
  }

  insertTransfer(transferDTO: Transfer) {
    this.http.post<Transfer>(this.API_URL, transferDTO).subscribe(data => console.log(data));
  }
}