import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS, HttpEvent } from '@angular/common/http';

import { TokenStorageService } from '../services/token-storage.service';
import { Observable } from 'rxjs';

@Injectable()

export class TokenInterceptor implements HttpInterceptor {
    constructor (private tokenStorage: TokenStorageService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.tokenStorage.getCountryToken();
        request = this.addToken(request, token)
        return next.handle(request);
    }

    private addToken(request: HttpRequest<any>, token: string)  {
        return request.clone({
            setHeaders: {'Authorization': `Bearer ${token}`}
        })
    }
}

export const counrtyTokenProvider = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
      }
];
