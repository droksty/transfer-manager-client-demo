import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

import { Associate } from "../_models/associate.model";

@Injectable({
  providedIn: 'root'
})
export class AssociateService {
  API_URL = 'http://localhost:8080/associates';

  associatesListSubject = new BehaviorSubject<Associate[]>([]);
  readonly data$ = this.associatesListSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getAssociates().subscribe(data => {
      this.associatesListSubject.next(data);
    })
  }

  getAssociates() {
    return this.http.get<Associate[]>(this.API_URL);
  }
}