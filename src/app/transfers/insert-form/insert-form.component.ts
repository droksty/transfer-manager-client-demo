import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';

import { TransferService } from '../transfer.service';
import { TRANSFER_TYPES } from "src/app/_models/transfer.model";
import { Transfer } from "src/app/_models/transfer.model";
import { Associate } from 'src/app/_models/associate.model';
import { AssociateService } from 'src/app/_services/associate.service';

@Component({
    selector: 'app-insert-form',
    templateUrl: './insert-form.component.html',
    styleUrls: ['./insert-form.component.css'],
    standalone: true,
    imports: [FormsModule]
})
export class InsertFormComponent implements OnInit {
  types = Object.keys(TRANSFER_TYPES);
  associateList: Associate[] = [];
  
  constructor(
    private associateService: AssociateService,
    private service: TransferService
  ) {}
  
  ngOnInit() {
    this.associateService.data$.subscribe(data => this.associateList = data);
  }

  submit(insertForm: NgForm) {
    const transfer: Transfer = insertForm.value;
    console.log(transfer);
    if (!transfer.type)
      transfer.type = undefined;
    if (!transfer.operator)
      transfer.operator = null;
    if (!transfer.client)
      transfer.client = null;

    /* let transferDTO = new TransferDTO(insertForm.value);
    console.log(transferDTO); */
    this.service.insertTransfer(transfer);
    insertForm.resetForm({ type: '', client: '', operator: '' });
  }

}
