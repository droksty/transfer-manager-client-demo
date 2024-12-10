import { Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { NotImplementedComponent } from "./not-implemented/not-implemented.component";
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { InsertFormComponent } from "./transfers/insert-form/insert-form.component";
import { TransferListComponent } from "./transfers/transfer-list/transfer-list.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'insert-transfer', component: InsertFormComponent },
  { path: 'search-transfers', component: SearchBarComponent },
  { path: 'list-transfers', component: TransferListComponent },
  { path: '**', component: NotImplementedComponent }
]