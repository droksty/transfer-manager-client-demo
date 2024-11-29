import { inject, Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";

import { Associate } from "../_models/associate.model";

@Injectable({
  providedIn: 'root'
})
export class AssociateService {
  private URL = 'http://localhost:8080/associates';
  private httpClient = inject(HttpClient);
  private associates = signal<Associate[]>([]);
  loadedAssociates = this.associates.asReadonly();
  
  
  getAssociates() {
    return this.fetchAssociates().pipe(tap({
      next: (associatesData) => this.associates.set(associatesData)
    }));
  }
  
  private fetchAssociates() {
    return this.httpClient.get<Associate[]>(this.URL)
  }

}