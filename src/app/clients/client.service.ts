import { Injectable, OnInit } from "@angular/core";
import { Client } from "../transfers/transfer.interface";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  API_URL = 'http://localhost:8080/clients';


  clientListSubject = new BehaviorSubject<Client[]>([]);
  readonly data$ = this.clientListSubject.asObservable();

  
  constructor (private http: HttpClient) {
    this.getClients().subscribe(data => {
      this.clientListSubject.next(data);
    })
  }


  getClients() {
    return this.http.get<Client[]>(this.API_URL);
  }
}