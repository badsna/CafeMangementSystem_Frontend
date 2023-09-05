import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });

    }
    console.log('Request URL:', request.url);
    console.log('Request Headers:', request.headers);

    console.log('Token ' + token);

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 || err.status === 403) {

            if (this.router.url === '/') {
              console.log("Navigating to root");
            }
            else {
              localStorage.clear();
              this.router.navigate(['/']);
            }
          }
        }
        return throwError(err);
      })
    );
  }
}
