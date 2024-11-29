import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TransferService } from '../../_services/transfer.service';
import { TRANSFER_TYPES } from "src/app/_models/transfer.model";
import { TransferList } from "src/app/_models/transfer-list.model";
import { Transfer } from "src/app/_models/transfer.model";
import { AssociateService } from 'src/app/_services/associate.service';

@Component({
    selector: 'app-transfer-list',
    templateUrl: './transfer-list.component.html',
    styleUrls: ['./transfer-list.component.css'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, DatePipe]
})
export class TransferListComponent implements OnInit {
  private associateService = inject(AssociateService);
  private transferService = inject(TransferService);
  private destroyRef = inject(DestroyRef);

  associates = this.associateService.loadedAssociates;

  
  transferList: TransferList = {} as TransferList;
  updateForm!: FormGroup;
  selectedTransfer: Transfer = {} as Transfer;
  types = Object.keys(TRANSFER_TYPES);

  isFetching = signal(false);
  error = signal('');
 

  ngOnInit() {
    this.fetchTransferList();

    const subscription = this.associateService.getAssociates().subscribe({
      error: (error) => console.log(error),
      complete: () => console.log(this.associates())
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());

    this.updateForm = new FormGroup({
      'pickupDate': new FormControl(null, [Validators.required]),
      'pickupTime': new FormControl(null, [Validators.required]),
      'passengerName': new FormControl(null),
      'totalPax': new FormControl(null),
      'type': new FormControl(null),
      'transferFrom': new FormControl(null, [Validators.required]),
      'transferTo': new FormControl(null, [Validators.required]),
      'priceTotal': new FormControl(null),
      'priceNet': new FormControl(null),
      'client': new FormControl(null),
      'operator': new FormControl(null),
      'operatorCost': new FormControl(null),
    });
  }

  onSelectTransfer(transfer: Transfer) {
    if (Object.keys(this.selectedTransfer).length === 0) {
      this.selectedTransfer = transfer;
      this.updateForm.patchValue({
      'pickupDate':     transfer.pickupDate,
      'pickupTime':     transfer.pickupTime,
      'passengerName':  transfer.passengerName,
      'totalPax':       transfer.totalPax,
      'type':           transfer.type,
      'transferFrom':   transfer.transferFrom,
      'transferTo':     transfer.transferTo,
      'priceTotal':     transfer.priceTotal,
      'priceNet':       transfer.priceNet,
      'client':         transfer.client,
      'operator':       transfer.operator,
      'operatorCost':   transfer.operatorCost
      });
    }
  }

  updateSelectedTransfer() {
    const transfer: Transfer = this.buildDTO();
    const subscription = this.transferService.updateTransfer(transfer).subscribe({
      next: () => console.log('Updating..'),
      error: (error: any) => console.log(error),
      complete: () => {
        this.clear()
        console.log('Updated!');
        this.fetchTransferList();
      }
    });
    this.destroyRef.onDestroy(()=>subscription.unsubscribe());
  }

  
  protected clear() {
    this.selectedTransfer = {} as Transfer;
    this.updateForm.reset();
  }

  
  /* Helper methods */

  private buildDTO(): Transfer {
    return {
      'id': this.selectedTransfer.id,
      'pickupDate': this.updateForm.get('pickupDate')?.value,
      'pickupTime': this.updateForm.get('pickupTime')?.value,
      'passengerName': this.updateForm.get('passengerName')?.value,
      'totalPax': this.updateForm.get('totalPax')?.value,
      'type': this.updateForm.get('type')?.value,
      'transferFrom': this.updateForm.get('transferFrom')?.value,
      'transferTo': this.updateForm.get('transferTo')?.value,
      'priceTotal': this.updateForm.get('priceTotal')?.value,
      'priceNet': this.updateForm.get('priceNet')?.value,
      'client': this.updateForm.get('client')?.value,
      'operator': this.updateForm.get('operator')?.value,
      'operatorCost':this.updateForm.get('operatorCost')?.value
    };
  }
  
  
  private fetchTransferList() {
    this.isFetching.set(true);
    
    const subscription = this.transferService.getTransferList().subscribe({
      next: transferList => this.transferList = transferList,
      error: (error) => this.error.set(error.message),
      complete: () => this.isFetching.set(false)
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
  
  


  // Refactoring
  protected deleteSelectedTransfer(id: number) {
    // Add prompt to confirm action?
    const subscription = this.transferService.deleteTransfer(id).subscribe({
      error: (error) => console.log(error),
      complete: () => {
        // Add modal to inform about successful delete?
        this.fetchTransferList();
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
