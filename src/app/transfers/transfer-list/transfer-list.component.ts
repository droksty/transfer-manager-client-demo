import { Component, DestroyRef, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
export class TransferListComponent {
  private associateService = inject(AssociateService);
  private activatedRoute = inject(ActivatedRoute);
  private transferService = inject(TransferService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router)
  
  protected associates = this.associateService.associates;
  protected updateForm: FormGroup = this.initializeUpdateForm();
  protected types = Object.keys(TRANSFER_TYPES);
  protected selectedTransfer: Transfer = {} as Transfer;
  protected transferList = input.required<TransferList>(); // how should I implement isFetching and error signals with the resolver approach??

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
        this.clear();
        console.log('Transfer updated!');
        // this.fetchTransferList();
        this.router.navigate([], { relativeTo: this.activatedRoute, onSameUrlNavigation: 'reload', queryParamsHandling: 'preserve' });
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
  
  protected deleteTransfer(id: number) {
    if (!window.confirm("Delete selected transfer?")) return;

    const subscription = this.transferService.deleteTransfer(id).subscribe({
      error: (error) => console.log(error),
      complete: () => {
        this.clear();
        // Add modal to inform about successful delete?
        // this.fetchTransferList();
        this.router.navigate([], { relativeTo: this.activatedRoute, onSameUrlNavigation: 'reload', queryParamsHandling: 'preserve' });
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  protected clear() {
    this.selectedTransfer = {} as Transfer;
    this.updateForm.reset();
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

  
  /* Deprecated */

  /* protected transferList = signal<TransferList>({} as TransferList);
  protected isFetching = signal<boolean>(false);
  protected error = signal<string>(''); */

  /* ngOnInit() {
    // Κάθε φορά που αλλάζουν τα queryParams κάνε κάτι
    const subscription = this.activatedRoute.queryParams.subscribe({
      next: (queryParams) => {
        console.log('HELLO FROM TRANSFER-LIST');
        queryParams['from'] === '' ? this.transferList.set({} as TransferList) : this.fetchTransferList()
      } 
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  } */

 /* private fetchTransferList() {
    this.isFetching.set(true);
    const subscription = this.transferService.getTransferList().subscribe({
      next: (responseData) => {
        this.transferList.set(responseData);
        this.error.set('');
      } ,
      error: (error) => this.error.set(error.message),
      complete: () => this.isFetching.set(false)
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  } */
}