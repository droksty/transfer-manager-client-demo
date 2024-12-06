import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AssociateService } from 'src/app/_services/associate.service';
import { TransferService } from '../../_services/transfer.service';
import { TRANSFER_TYPES } from "src/app/_models/transfer.model";
import { TransferList } from "src/app/_models/transfer-list.model";
import { Transfer } from "src/app/_models/transfer.model";

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

  protected updateForm: FormGroup = this.initializeUpdateForm();
  protected associates = this.associateService.associates;
  protected types = Object.keys(TRANSFER_TYPES);
  protected transferList = signal<TransferList>({} as TransferList);
  protected selectedTransfer: Transfer = {} as Transfer;
  protected isFetching = signal<boolean>(false);
  protected error = signal<string>('');

  ngOnInit() {
    this.fetchTransferList();
  }

  private initializeUpdateForm() {
    return new FormGroup({
      'pickupDate':     new FormControl(null, [Validators.required]),
      'pickupTime':     new FormControl(null, [Validators.required]),
      'passengerName':  new FormControl(null),
      'totalPax':       new FormControl(null, [Validators.min(0)]),
      'type':           new FormControl(null),
      'transferFrom':   new FormControl(null, [Validators.required]),
      'transferTo':     new FormControl(null, [Validators.required]),
      'priceTotal':     new FormControl(null, [Validators.min(0)]),
      'priceNet':       new FormControl(null, [Validators.min(0)]),
      'client':         new FormControl(null),
      'operator':       new FormControl(null),
      'operatorCost':   new FormControl(null, [Validators.min(0)]),
    });
  }

  private fetchTransferList() {
    this.isFetching.set(true);
    const subscription = this.transferService.getTransferList().subscribe({
      next: (responseData) => this.transferList.set(responseData),
      error: (error) => this.error.set(error.message),
      complete: () => this.isFetching.set(false)
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  protected deleteTransfer(id: number) {
    // Add prompt to confirm action?
    const subscription = this.transferService.deleteTransfer(id).subscribe({
      error: (error) => console.log(error),
      complete: () => {
        this.clear();
        // Add modal to inform about successful delete?
        this.fetchTransferList();
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  protected clear() {
    this.selectedTransfer = {} as Transfer;
    this.updateForm.reset();
  }

  protected selectTransfer(transfer: Transfer) {
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

  protected updateSelectedTransfer() {
    const transfer: Transfer = this.extractUserInput();
    const subscription = this.transferService.updateTransfer(transfer).subscribe({
      next: () => console.log('Updating..'),
      error: (error: any) => console.log(error),
      complete: () => {
        this.clear()
        console.log('Updated!');
        this.fetchTransferList();
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  private extractUserInput(): Transfer {
    return {
      'id':             this.selectedTransfer.id,
      'pickupDate':     this.updateForm.get('pickupDate')?.value,
      'pickupTime':     this.updateForm.get('pickupTime')?.value,
      'passengerName':  this.updateForm.get('passengerName')?.value,
      'totalPax':       this.updateForm.get('totalPax')?.value,
      'type':           this.updateForm.get('type')?.value ? this.updateForm.get('type')?.value : undefined,
      'transferFrom':   this.updateForm.get('transferFrom')?.value,
      'transferTo':     this.updateForm.get('transferTo')?.value,
      'priceTotal':     this.updateForm.get('priceTotal')?.value,
      'priceNet':       this.updateForm.get('priceNet')?.value,
      'client':         this.updateForm.get('client')?.value ? this.updateForm.get('client')?.value : null,
      'operator':       this.updateForm.get('operator')?.value ? this.updateForm.get('operator')?.value : null,
      'operatorCost':   this.updateForm.get('operatorCost')?.value
    };
  }

}