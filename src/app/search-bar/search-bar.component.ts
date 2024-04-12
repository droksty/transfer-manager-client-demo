import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { SearchFormData } from '../transfers/transfer.interface';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchBetween: boolean = false;

  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
    if (this.location.path() === '/transfers/search-between') this.searchBetween = true;
  }

  onSubmit(searchForm: NgForm) {
    let formData: SearchFormData = searchForm.value;
    if (!this.searchBetween) {
      this.router.navigate(
        ['transfers/by-date'],
        { queryParams: { 
          date: formData.date, 
          client: formData.clientTitle, 
          provider:formData.providerName } 
        });
    } else {
      this.router.navigate(
        ['transfers/by-dates-between'],
        { queryParams: { 
          from: formData.pickupDateFrom,
          to: formData.pickupDateTo,
          client: formData.clientTitle, 
          provider:formData.providerName } 
        });
    }
  }

}
