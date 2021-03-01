import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iinfo } from '../interface/info.model';
import { Contact } from '../interface/contact.model';

@Injectable({
  providedIn: 'root'
})
export class SendMailServiceService {

  constructor(private http: HttpClient) { }
  //url = 'http://ldbbackend-env.eba-tgrfb2an.eu-central-1.elasticbeanstalk.com'
  //url = "http://localhost:3000"
  //url = "https://www.api.ldbpolska.com";
  url = "https://email.ldbpolska.com";

  
  sendEmail(obj): Observable<Iinfo> {
    return this.http.post<Iinfo>(this.url + '/sendFormData', obj);
  }
  sendEnquiryMail(obj): Observable<Contact> {
    return this.http.post<Contact>(this.url + '/sendEnquiryFormData', obj);
  }
}
