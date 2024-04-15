import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Client, Provider, SearchFormData } from '../transfers/transfer.interface';
import { ClientService } from '../clients/client.service';
import { ProviderService } from '../providers/provider.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  searchBetween: boolean = false;
  clientList: Client[] = [];
  providerList: Provider[] = [];

  constructor(private router: Router, private clientService: ClientService, private providerService: ProviderService) { }

  ngOnInit() {
    if (this.router.url === '/transfers/search-within-range') this.searchBetween = true;
    this.clientService.data$.subscribe(data => this.clientList = data);
    this.providerService.data$.subscribe(data => this.providerList = data);
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
