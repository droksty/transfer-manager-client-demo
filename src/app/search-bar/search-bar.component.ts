import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { SearchFormData } from '../transfers/transfer.interface';

import { NgIf, NgFor } from '@angular/common';
import { Associate } from '../_models/associate.model';
import { AssociateService } from '../_services/associate.service';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css'],
    standalone: true,
    imports: [FormsModule, NgIf, NgFor]
})
export class SearchBarComponent implements OnInit {
  searchBetween: boolean = false;
  associateList: Associate[] = [];

  constructor(private associateService: AssociateService, private router: Router) { }

  ngOnInit() {
    if (this.router.url === '/transfers/search-within-range') this.searchBetween = true;
    this.associateService.data$.subscribe(data => this.associateList = data);
  }

  onSubmit(searchForm: NgForm) {
    let formData: SearchFormData = searchForm.value;
  
    this.router.navigate(['transfers/list'],
    { queryParams: {
      date: formData.date,
      from: formData.pickupDateFrom,
      to: formData.pickupDateTo,
      client: formData.clientTitle, 
      provider: formData.providerName
    }})
  }

}
