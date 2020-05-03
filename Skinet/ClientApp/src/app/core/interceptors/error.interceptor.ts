import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEventType,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toastrService: ToastrService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        if (err) {
          if (err.status === 400) {
            if (err.error.errors) {
              throw err.error;
            } else {
              this.toastrService.error(
                err.error.message,
                err.error.statusCode.toString()
              );
            }
          }

          if (err.status === 401) {
            this.toastrService.error(
              err.error.message,
              err.error.statusCode.toString()
            );
          }

          if (err.status === 404) {
            this.router.navigate(['/not-found']);
          }
          if (err.status === 500) {
            const navigationExtras: NavigationExtras = {
              state: { error: err.error },
            };
            console.log('nav', navigationExtras);
            this.router.navigate(['/server-error'], navigationExtras);
          }
        }
        return throwError(err);
      })
    );
  }
}
