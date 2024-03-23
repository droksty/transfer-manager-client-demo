import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TransferListComponent } from "./transfers/transfer-list/transfer-list.component";
import { InsertFormComponent } from "./transfers/insert-form/insert-form.component";
import { NotImplementedComponent } from "./not-implemented/not-implemented.component";

const routes: Routes = [
  { path: 'transfers/list', component: TransferListComponent },
  { path: 'transfers/insert', component: InsertFormComponent },
  { path: '**', component: NotImplementedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }