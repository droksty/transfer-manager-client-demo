import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TransferListComponent } from "./transfers/transfer-list/transfer-list.component";
import { InsertFormComponent } from "./transfers/insert-form/insert-form.component";
import { NotImplementedComponent } from "./not-implemented/not-implemented.component";
import { SearchBarComponent } from "./search-bar/search-bar.component";

const routes: Routes = [
  { path: 'transfers', children: [
    { path: 'insert', component: InsertFormComponent },
    { path: 'search', component: SearchBarComponent },
    { path: 'search-between', component: SearchBarComponent },
    { path: 'by-date', component: TransferListComponent },
    { path: 'by-dates-between', component: TransferListComponent },
  ]},
  { path: '**', component: NotImplementedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }