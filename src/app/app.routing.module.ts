import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TransferListComponent } from "./transfers/transfer-list/transfer-list.component";

const routes: Routes = [
  { path: 'transfers/list', component: TransferListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }