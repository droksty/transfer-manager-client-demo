import { Component, OnInit } from '@angular/core';

import { TransferService } from '../transfer.service';
import { Client, Provider, TransferDTO } from '../transfer.interface';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from 'src/app/clients/client.service';
import { ProviderService } from 'src/app/providers/provider.service';
import { NgFor, NgIf, DatePipe } from '@angular/common';

@Component({
    selector: 'app-transfer-list',
    templateUrl: './transfer-list.component.html',
    styleUrls: ['./transfer-list.component.css'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgFor, NgIf, DatePipe]
})
export class TransferListComponent implements OnInit {
  transfers: TransferDTO[] = [];
  updateForm!: FormGroup;
  transferSelected: TransferDTO = {} as TransferDTO;
  
  types = ['SHARED', 'PRIVATE', 'VIP'];
  clientList: Client[] = [];
  providerList: Provider[] = [];


  constructor(
    private transferService: TransferService,
    private clientService: ClientService,
    private providerService: ProviderService
  ) {}


  ngOnInit() {
    this.fetchTransferList();
    this.clientService.data$.subscribe(data => this.clientList = data);
    this.providerService.data$.subscribe(data => this.providerList = data);
    this.updateForm = new FormGroup({
      'pickupDate': new FormControl(null, [Validators.required]),
      'pickupTime': new FormControl(null, [Validators.required]),
      'passengerName': new FormControl(null),
      'pax': new FormControl(null),
      'type': new FormControl(null),
      'transferFrom': new FormControl(null, [Validators.required]),
      'transferTo': new FormControl(null, [Validators.required]),
      'priceTotal': new FormControl(null),
      'priceNet': new FormControl(null),
      'client': new FormControl(null),
      'provider': new FormControl(null),
      'providerCost': new FormControl(null),
    })
  }


  selectTransfer(transfer: TransferDTO) {
    if (Object.keys(this.transferSelected).length === 0) {
      this.transferSelected = transfer;
      this.updateForm.patchValue({
      'pickupDate': transfer.pickupDate,
      'pickupTime': transfer.pickupTime,
      'passengerName': transfer.passengerName,
      'pax': transfer.pax,
      'type': transfer.type,
      'transferFrom': transfer.transferFrom,
      'transferTo': transfer.transferTo,
      'priceTotal': transfer.priceTotal,
      'priceNet': transfer.priceNet,
      'client': transfer.client,
      'provider': transfer.provider,
      'providerCost': transfer.providerCost
      })
    }
  }


  onDelete(id: number) {
    // confirm prompt?
    this.transferService.deleteTransfer(id).subscribe({
      next: () => console.log('Deleting..'),
      error: (error: any) => console.log(error),
      complete: () => {
        console.log('Deleted!');
        this.fetchTransferList();
      }
    });
  }


  onUpdate() {
    let updatedTransfer: TransferDTO = {
      'id': this.transferSelected.id,
      'pickupDate': this.updateForm.get('pickupDate')?.value,
      'pickupTime': this.updateForm.get('pickupTime')?.value,
      'passengerName': this.updateForm.get('passengerName')?.value,
      'pax': this.updateForm.get('pax')?.value,
      'type': this.updateForm.get('type')?.value,
      'transferFrom': this.updateForm.get('transferFrom')?.value,
      'transferTo': this.updateForm.get('transferTo')?.value,
      'priceTotal': this.updateForm.get('priceTotal')?.value,
      'priceNet': this.updateForm.get('priceNet')?.value,
      'client': this.updateForm.get('client')?.value,
      'provider': this.updateForm.get('provider')?.value,
      'providerCost':this.updateForm.get('providerCost')?.value
    }

    this.clear();
    this.doUpdate(updatedTransfer);
    this.fetchTransferList();
  }


  protected clear() {
    this.transferSelected = {} as TransferDTO;
    this.updateForm.reset();
    console.log(this.updateForm.value)
  }


  private fetchTransferList() {
    this.transferService.getTransferList().subscribe(transferList => {
      this.transfers = transferList;
    });
  }

  private doUpdate(updatedTransfer: TransferDTO) {
    this.transferService.updateTransfer(updatedTransfer).subscribe({
      next: () => console.log('Updating..'),
      error: (error: any) => console.log(error),
      complete: () => {
        console.log('Updated!');
        this.fetchTransferList();
      }
    });
  }
}
