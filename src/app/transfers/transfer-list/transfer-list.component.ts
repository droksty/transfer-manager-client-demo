import { Component, OnInit } from '@angular/core';

import { TransferService } from '../transfer.service';
import { TransferDTO } from '../transfer.interface';

@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.css']
})
export class TransferListComponent implements OnInit {
  transfers: TransferDTO[] = [];

  constructor(private transferService: TransferService) { }


  ngOnInit(): void {
    this.fetchTransferList();
  }


  delete(id: number) {
    this.transferService.deleteTransfer(id).subscribe({
      next: () => console.log('Deleting..'),
      error: (error: any) => console.log(error),
      complete: () => {
        console.log('Deleted!');
        this.fetchTransferList();
      }
    });
  }


  private fetchTransferList() {
    this.transferService.getTransferList().subscribe(transferList => {
      this.transfers = transferList;
    });
  }
}
