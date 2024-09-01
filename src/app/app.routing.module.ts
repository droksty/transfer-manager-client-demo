import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TransferListComponent } from "./transfers/transfer-list/transfer-list.component";
import { InsertFormComponent } from "./transfers/insert-form/insert-form.component";
import { NotImplementedComponent } from "./not-implemented/not-implemented.component";
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'transfers', children: [
    { path: 'insert', component: InsertFormComponent },
    { path: 'search', component: SearchBarComponent },
    { path: 'list', component: TransferListComponent },
  ] },
  { path: '**', component: NotImplementedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }