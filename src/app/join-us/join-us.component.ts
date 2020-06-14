import { Component, OnInit } from '@angular/core';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.scss']
})
export class JoinUsComponent implements OnInit {
  selectedCountry:any;
  AllCountryList:any;
  constructor(private countryService: CountryService) { }
 
  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    setTimeout(()=>{
      this.countryService.getCountriesList().subscribe((data)=>{
        this.AllCountryList = data
      })
      console.log(this.AllCountryList)
    },5000)
    
  }
 


}
