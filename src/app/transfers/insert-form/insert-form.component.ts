import { Component, Provider } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Client, Transfer } from '../transfer.interface';
import { TransferService } from '../transfer.service';

@Component({
  selector: 'app-insert-form',
  templateUrl: './insert-form.component.html',
  styleUrls: ['./insert-form.component.css']
})
export class InsertFormComponent {
  types = ['SHARED', 'PRIVATE', 'VIP'];
  clients: Client[] = [
    { 'id': 6, 'title': 'Hotel A' },
    { 'id': 7, 'title': 'Hotel B' },
    { 'id': 8, 'title': 'Agent A' },
    { 'id': 9, 'title': 'Agent B' },
  ];
  providers: Provider[] = [];

  constructor(private service: TransferService) {}


  onSubmit(insertForm: NgForm) {
    let transferDTO: Transfer = this.transformToDTO(insertForm.value);
    console.log(transferDTO);
    this.service.insertTransfer(transferDTO);
    insertForm.resetForm();
  }

  private transformToDTO(userInput: Transfer): Transfer {
    let client = this.clients.find((client) => client.title === userInput.client?.title);
    userInput.client = client;
    return userInput;
  }

  clearForm(insertForm: NgForm) {
    insertForm.reset();
  }
}
