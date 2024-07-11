import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app.routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TransferService } from "./transfers/transfer.service";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule),
    TransferService, provideHttpClient(withInterceptorsFromDi())
  ]
}

// To ensure a smooth migration, the migration schematic
// adds more providers to the bootstrapApplication method that necessary/desirable

// Refactor and optimize later