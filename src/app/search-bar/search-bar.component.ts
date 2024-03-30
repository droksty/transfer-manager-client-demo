import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from '../transfers/transfer.interface';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  constructor(private router: Router) { }

  onSubmit(searchForm: NgForm) {
    const pickupDateFrom = searchForm.value['pickupDateFrom'];
    this.router.navigate(['transfers/list'], { queryParams: { date: pickupDateFrom } });

    // const pickupDateTo = searchForm.value['pickupDateTo'];
    // const client: Client = searchForm.value['client'];
    // const provider = searchForm.value['provider'];
    // this.router.navigate(['transfers/list'], { queryParams: { date: pickupDateFrom, dateTo: pickupDateTo, clientTitle: client.title } })
  }

}
