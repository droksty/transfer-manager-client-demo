import { DestroyRef, inject, Injectable, OnInit, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

import { Associate } from '../_models/associate.model';

@Injectable({
  providedIn: 'root',
})
export class AssociateService {
  private URL = 'http://localhost:8080/associates';
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);
  private _associates = signal<Associate[]>([]);
  associates = this._associates.asReadonly();

  // Fetch associates only on application start or
  // when an associate is inserted, updated or deleted.
  constructor() {
    this.loadAssociates();
  }


  private loadAssociates() {
    const subscription = this.getAssociates()
      .pipe(
        tap({
          next: (associatesData) => this._associates.set(associatesData),
        })
      )
      .subscribe({
        error: (error) => console.log(error),
        complete: () => console.log('completed'),
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  private getAssociates() {
    return this.httpClient.get<Associate[]>(this.URL);
  }
}
