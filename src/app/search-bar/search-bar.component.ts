import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { SearchFormData } from '../transfers/transfer.interface';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchBetween: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.router.url === '/transfers/search-within-range') this.searchBetween = true;
  }

  onSubmit(searchForm: NgForm) {
    let formData: SearchFormData = searchForm.value;
  
    this.router.navigate(['transfers/list'],
    { queryParams: {
      date: formData.date,
      from: formData.pickupDateFrom,
      to: formData.pickupDateTo,
      client: formData.clientTitle, 
      provider:formData.providerName
    }})
  }

}
