import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { TokenStorageService } from '../services/token-storage.service';
import { Observable, throwError } from 'rxjs/';
import { catchError } from 'rxjs/operators';
import { CountryService } from '../country.service';

@Injectable()

export class TokenInterceptor implements HttpInterceptor {
    constructor (private tokenStorage: TokenStorageService, private countryService: CountryService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = this.tokenStorage.getCountryToken();
        request = this.addToken(request, token)
        return next.handle(request).pipe(
            catchError((error:HttpErrorResponse) => {
               this.handleError(error)

                return throwError(error)
            })
        )
    }

    handleError(error:any) {
        
            console.log(`Error ${error.status}`)
            let getTokenData = this.countryService.getAccessToken().subscribe((data)=>{
                this.tokenStorage.saveCountryToken(data['auth_token'])
              });
        
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
