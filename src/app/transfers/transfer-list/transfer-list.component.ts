import { Component, OnInit } from '@angular/core';

import { TransferService } from '../transfer.service';

@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.css']
})
export class TransferListComponent implements OnInit {

  constructor(private transferService: TransferService) {}

  ngOnInit(): void {
    this.transferService.getTransferList();
  }

}
