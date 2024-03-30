import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TransferListComponent } from "./transfers/transfer-list/transfer-list.component";
import { InsertFormComponent } from "./transfers/insert-form/insert-form.component";
import { NotImplementedComponent } from "./not-implemented/not-implemented.component";
import { SearchBarComponent } from "./search-bar/search-bar.component";

const routes: Routes = [
  // { path: 'transfers/list/:dateStart', component: TransferListComponent },
  { path: 'transfers/list', component: TransferListComponent },
  { path: 'transfers/insert', component: InsertFormComponent },
  { path: 'transfers/search', component: SearchBarComponent },
  { path: '**', component: NotImplementedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }