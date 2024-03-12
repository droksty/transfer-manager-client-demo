import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TransferListComponent } from './transfers/transfer-list/transfer-list.component';
import { AppRoutingModule } from './app.routing.module';
import { TransferService } from './transfers/transfer.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TransferListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [TransferService],
  bootstrap: [AppComponent]
})
export class AppModule { }