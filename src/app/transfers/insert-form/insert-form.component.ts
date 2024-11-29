import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';

import { TransferService } from '../transfer.service';
import { TRANSFER_TYPES } from "src/app/_models/transfer.model";
import { Transfer } from "src/app/_models/transfer.model";
import { AssociateService } from 'src/app/_services/associate.service';

@Component({
    selector: 'app-insert-form',
    templateUrl: './insert-form.component.html',
    styleUrls: ['./insert-form.component.css'],
    standalone: true,
    imports: [FormsModule]
})
export class InsertFormComponent implements OnInit {
  private associateService = inject(AssociateService);
  private transferService = inject(TransferService);
  private destroyRef = inject(DestroyRef);
  
  types = Object.keys(TRANSFER_TYPES);
  associates = this.associateService.loadedAssociates;
  
  ngOnInit() {
    const subscription = this.associateService.getAssociates().subscribe({
      error: (error) => console.log(error),
      complete: () => console.log('completed')
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  submit(insertForm: NgForm) {
    const transfer: Transfer = insertForm.value;
    if (!transfer.type)     transfer.type = undefined;
    if (!transfer.operator) transfer.operator = null;
    if (!transfer.client)   transfer.client = null;

    // DO SET UP SUBSCRIPTION AND DESTROYREF???
    this.transferService.insertTransfer(transfer);
    insertForm.resetForm({ type: '', client: '', operator: '' });
  }

}
