import { Component, DestroyRef, inject, viewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AssociateService } from '../_services/associate.service';
import { TransferListComponent } from "../transfers/transfer-list/transfer-list.component";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  standalone: true,
  imports: [FormsModule, TransferListComponent],
})
export class SearchBarComponent {
  private associateService = inject(AssociateService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  private form = viewChild.required<NgForm>('searchForm');
  protected associates = this.associateService.associates;

  ngOnInit() {
    const subscription = this.activatedRoute.queryParams.subscribe({
      next: (queryParams) => {
        if (queryParams['from'] === '' && queryParams['to'] === '' && queryParams['client'] === '' && queryParams['operator'] === '') {
          this.form().resetForm(queryParams)
        }
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  // Maybe in a future patch change from template driven forms to plain template variables?
  protected submit(form: NgForm) {
    this.router.navigate([], {
      queryParams: {
        from: form.value.fromDate,
        to: form.value.toDate,
        client: form.value.client,
        operator: form.value.operator
      }
    });
  }
}
