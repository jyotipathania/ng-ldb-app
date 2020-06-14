import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  accessToken: any;
  headersToken: any;
  reqHeaders: any;

  //API_Key = "T6VPNRfWnLEngl0wvv7-gWvcOJDqOJJmsvh6CNtj9kzugTRbHouuDOSWy7sbbstnmh0"
  API_Key = "NgowpTj4FC6WVhpcyrtWjg5q0fCzi80VUkRqQ7ffK7K2wZYktPFRc2JjFH6SyQjjhYs"
  user_email = "alt.zw-atwxnds@yopmail.com"
  constructor(private httpClient: HttpClient) {
    // this.headersToken = new  HttpHeaders();
    // this.headersToken.set("Accept", "application/json")
    // this.headersToken.set("api-token", this.API_Key)
    // this.headersToken.set("user-email", "ask@universal-tutorial.com")

    // this.httpClient.get("https://www.universal-tutorial.com/api/getaccesstoken", {'headers':this.headersToken}).subscribe((data)=>{
    //   return  this.accessToken = data
    // });

    // this.reqHeaders = new HttpHeaders();
    // this.reqHeaders.set("Authorization", `Bearer ${this.accessToken}`)
    // this.reqHeaders.set("Accept", "application/json")
    this.getAccessToken()
   }

   ngOnInit(): void {
    
   
    
  }

 
 //this.accessToken =  this.httpClient.get("https://www.universal-tutorial.com/api/getaccesstoken", {'headers':this.headersToken});

 getAccessToken() {
    return this.httpClient.get("https://www.universal-tutorial.com/api/getaccesstoken", {headers:{"Accept": "application/json","user-email": `${this.user_email}`,"api-token": `${this.API_Key}`}})
 }
  

   /*getCountriesList() {    
       return this.httpClient.get("https://www.universal-tutorial.com/api/countries/", { headers: {Authorization: `Bearer ${this.accessToken['auth_token']}`, Accept: "application/json"}});
   
    }*/
    getCountriesList() {    
      return this.httpClient.get("https://www.universal-tutorial.com/api/countries/", { headers: {Accept: "application/json"}});
  
   }
}
