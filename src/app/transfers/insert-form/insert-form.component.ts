import { Component, DestroyRef, inject } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';

import { TransferService } from '../../_services/transfer.service';
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
export class InsertFormComponent {
  private associateService = inject(AssociateService);
  private transferService = inject(TransferService);
  private destroyRef = inject(DestroyRef);
  
  protected formDefaults = { type: '', client: '', operator: '' };
  protected types = Object.keys(TRANSFER_TYPES);
  protected associates = this.associateService.associates;
  
  protected submit(insertForm: NgForm) {
    const transferDto: Transfer = insertForm.value;
    if (!transferDto.type)     transferDto.type = undefined;
    if (!transferDto.operator) transferDto.operator = null;
    if (!transferDto.client)   transferDto.client = null;

    const subscription = this.transferService.insertTransfer(transferDto).subscribe({
      next: responseData => console.log(responseData),
      error: error => console.log(error),
      complete: () => console.log('Transfer succesfully persisted')
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());

    insertForm.resetForm(this.formDefaults);
  }

}
