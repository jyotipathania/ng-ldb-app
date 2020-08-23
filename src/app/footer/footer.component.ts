import { Component, OnInit } from '@angular/core';
import { Contact } from '../interface/contact.model';
import { SendMailServiceService } from '../services/send-mail-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  isValidFormSubmitted = false;
  userRole = ["I am interested for Partnership","I am Interested for IT Services","I am Looking for information","Other"];
  model:Contact = {
    inputRole: '',
    inputName: '',
    inputEmail: '',
    inputMessage: ''
  }
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  constructor(private sendMailServiceService: SendMailServiceService) { }

  ngOnInit(): void {
  }


  onSubmitEnquiryForm(form: NgForm) {
    this.isValidFormSubmitted = false;
    if(form.invalid) return;
    this.model = form.value;
    this.sendMailServiceService.sendEnquiryMail(this.model).subscribe(data =>{
      this.isValidFormSubmitted = true;
      form.resetForm()
      this.model.inputRole = '';
     // console.log(this.model)
    },error => {
        console.log("error: ", error);
    })
   
  }

}
