import { Component, OnInit } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { TransferDTO } from '../transfer.interface';
import { TransferService } from '../transfer.service';
import { NgFor } from '@angular/common';
import { Associate } from 'src/app/_models/associate.model';
import { AssociateService } from 'src/app/_services/associate.service';

@Component({
    selector: 'app-insert-form',
    templateUrl: './insert-form.component.html',
    styleUrls: ['./insert-form.component.css'],
    standalone: true,
    imports: [FormsModule, NgFor]
})
export class InsertFormComponent implements OnInit {
  types = ['SHARED', 'PRIVATE', 'VIP'];
  associateList: Associate[] = [];
  
  constructor(private associateService: AssociateService, private service: TransferService) {}
  
  ngOnInit() {
    this.associateService.data$.subscribe(data => this.associateList = data);
  }

  submit(insertForm: NgForm) {
    let transferDTO = new TransferDTO(insertForm.value);
    console.log(transferDTO);
    this.service.insertTransfer(transferDTO);
    insertForm.resetForm({ type: '', client: '', operator: '' });
  }

}
