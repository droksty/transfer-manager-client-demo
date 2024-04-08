import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

import { Provider } from "../transfers/transfer.interface";

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  API_URL = 'http://localhost:8080/providers';


  providerListSubject = new BehaviorSubject<Provider[]>([]);
  readonly data$ = this.providerListSubject.asObservable();

  
  constructor (private http: HttpClient) {
    this.getProviders().subscribe(data => {
      this.providerListSubject.next(data);
    })
  }


  getProviders() {
    return this.http.get<Provider[]>(this.API_URL);
  }
}