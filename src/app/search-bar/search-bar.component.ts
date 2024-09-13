import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SearchFormData } from '../transfers/transfer.interface';

import { NgFor } from '@angular/common';
import { Associate } from '../_models/associate.model';
import { AssociateService } from '../_services/associate.service';
import { TransferListComponent } from "../transfers/transfer-list/transfer-list.component";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
  standalone: true,
  imports: [FormsModule, NgFor, TransferListComponent],
})
export class SearchBarComponent implements OnInit {
  associateList: Associate[] = [];

  constructor(
    private associateService: AssociateService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.associateService.data$.subscribe(
      (data) => (this.associateList = data)
    );
  }

  onSubmit(searchForm: NgForm) {
    let formData: SearchFormData = searchForm.value;

    this.router.navigate(['search-transfers/with'], {
      queryParams: {
        // date: formData.date,
        from: formData.pickupDateFrom,
        to: formData.pickupDateTo,
        client: formData.clientTitle,
        operator: formData.operatorTitle,
      },
    });

    // this.router.navigate([], {
    //   relativeTo: this.activatedRoute,
    //   queryParams: {
    //     from: formData.pickupDateFrom,
    //     to: formData.pickupDateTo,
    //     client: formData.clientTitle,
    //     provider: formData.providerName
    //   },
    // })
  }
}
