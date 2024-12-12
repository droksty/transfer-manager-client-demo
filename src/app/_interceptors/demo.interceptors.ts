import { HttpRequest, HttpHandlerFn, HttpEventType } from "@angular/common/http";
import { tap } from "rxjs";

export function demoRequestInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  console.log("[OUTGOING REQUEST]\n", request);
  const req = request.clone({ // The original request object is not mutable
    headers: request.headers.set('test-header', 'test-header-value') 
  });
  return next(req);
}

export function demoResponseInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  return next(req).pipe(tap({
    next: event => {
      if (event.type === HttpEventType.Response) {
        console.log('[INCOMING RESPONSE]\n', event)
      }
    }
  }));
}