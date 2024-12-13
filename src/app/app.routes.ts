import { Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { NotImplementedComponent } from "./not-implemented/not-implemented.component";
import { InsertFormComponent } from "./transfers/insert-form/insert-form.component";
import { TransferListComponent } from "./transfers/transfer-list/transfer-list.component";
import { TransfersComponent } from "./transfers/transfers.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent },
  {
    path: 'transfers',
    redirectTo: '/transfers/search',
    pathMatch: 'full' },
  {
    path: 'transfers/insert',
    component: InsertFormComponent },
  {
    path: 'transfers/search',
    component: TransfersComponent, children: [
      { 
        path: '',
        component: TransferListComponent,
        // resolve: { test: resolveSearch },
        // runGuardsAndResolvers: 'always'
      }
    ] 
  },
  {
    path: '**',
    component: NotImplementedComponent
  }
]