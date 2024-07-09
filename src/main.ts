import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app/app.routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TransferService } from './app/transfers/transfer.service';


bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule),
        TransferService, provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
