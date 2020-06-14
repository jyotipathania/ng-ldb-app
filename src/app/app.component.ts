import { Component, OnInit } from '@angular/core';
import { CountryService } from './country.service';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ldb-app';

  constructor (private countryService: CountryService, private tokenStorage: TokenStorageService){}

  ngOnInit():void {
    let getTokenData = this.countryService.getAccessToken().subscribe((data)=>{
      this.tokenStorage.saveCountryToken(data['auth_token'])
    });

    
   
  }
}
