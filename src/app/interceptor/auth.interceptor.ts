import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { StoreService } from '../service/store.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private store: StoreService,
    private authService: AuthService,
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const accessToken = this.store.getAccessToken();

    if (accessToken) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
      });
      return next.handle(cloned).pipe(
        catchError((err: HttpErrorResponse) => {
          console.log("error catched");
          if (err.status === 401) {
            console.log("error 401 catched");
            this.authService.logout();
          }
          return throwError(err);
        }),
      );
    }
    return next.handle(request);
  }
}
