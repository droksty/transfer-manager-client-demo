import { Component, inject } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AssociateService } from '../_services/associate.service';
import { TransferListComponent } from "../transfers/transfer-list/transfer-list.component";
import { SearchCriteria } from '../_models/search-criteria.model';

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
  
  protected associates = this.associateService.associates;

  // Maybe in a future patch change from template driven forms to plain template variables
  // and also change routing and combine search-bar with transfer-list components?
  protected submit(form: NgForm) {
    const formData: SearchCriteria = form.value;
    
    this.router.navigate(
      ['list-transfers'],
      { queryParams: { from: formData.fromDate, to: formData.toDate, client: formData.client, operator: formData.operator }}
    );

    /* this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        from: formData.pickupDateFrom,
        to: formData.pickupDateTo,
        client: formData.clientTitle,
        provider: formData.providerName
      },
    }) */
  }
}
