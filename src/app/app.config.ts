import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app.routing.module";
import { HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from "@angular/common/http";
import { tap } from "rxjs";

function demoInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  console.log("[OUTGOING REQUEST]");
  console.log(request);
  const req = request.clone({
    headers: request.headers.set('DEMO-HEADER', 'DEMO HEADER') // The original request object is not mutable.
  });
  return next(req);
}

function demoResponseInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  return next(req).pipe(tap(event => {
    console.log(["INCOMING RESPONSE"])
    console.log(event)
  }))
}

// To ensure a smooth migration,
// the migration schematic adds more providers
// to the bootstrapApplication method than necessary/desirable.
// Refactor and optimize later?
export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule),
    provideHttpClient(withInterceptors([demoInterceptor, demoResponseInterceptor]))
  ]
}