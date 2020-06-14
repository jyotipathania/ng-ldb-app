import { Injectable } from '@angular/core';

const COUNTRY_TOKEN_KEY = 'country-auth-token'

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public saveCountryToken(token: string) {
    window.localStorage.removeItem(COUNTRY_TOKEN_KEY);
    window.localStorage.setItem(COUNTRY_TOKEN_KEY, token);
  }

  public getCountryToken():string {
    return window.localStorage.getItem(COUNTRY_TOKEN_KEY);
  }

}
