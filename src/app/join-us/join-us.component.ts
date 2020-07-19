import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CountryService } from '../country.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SendMailServiceService } from '../services/send-mail-service.service';

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.scss']
})
export class JoinUsComponent implements OnInit {
  @ViewChild('scrollToDiv')  myscrollToDiv: ElementRef; 
  isValidFormSubmitted:any = null;
  isFormSubmitCompleted:boolean = true;
  selectedCountry:string = "AD";
  selectedCity:string;
  selectedState:string;
  AllCountryList:any;
  country:any;
  states:any;
  cities:any;
  cityDefault:any;
  noEditable: boolean = true;
  isCitiesDataFetched: boolean = true;
  //Reactive form init
  //https://www.concretepage.com/angular-2/angular-2-4-email-validation-example
  joinusForm: FormGroup;

  constructor(
              private countryService: CountryService, 
              private fb: FormBuilder, 
              private el: ElementRef,
              private sendmailservice: SendMailServiceService
              ) { }
 
  ngOnInit(): void {
    this.joinusForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      userEmail:["", [
                      Validators.required,
                      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
                    ]
              ],
      userPeselorPassport: ["", Validators.required],
      address: this.fb.group({
        inputAddress: ["", Validators.required],
        inputAddress2: [""],
        inputCountry: ["PL", Validators.required],
        inputState: ["", Validators.required],
        inputCity: ["", Validators.required],
        inputZip: ["", [
                        Validators.required,
                        Validators.pattern("^([0-9]{5})?$")
                      ]
                  ],
        inputPhone:["", Validators.required]
      })
      
    })
  }

  onSubmit(form: FormGroup) {
    
    if(form.invalid) {
      for (const key of Object.keys(form.controls)) {
        if (form.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
       }
  }
      return;
    }
    this.isFormSubmitCompleted = false;
   
    
   // console.log("FirstName: ", form.value);
    this.sendmailservice.sendEmail(form.value).
    subscribe(data => {
      //let msg = data['message']
      this.myscrollToDiv.nativeElement.scrollIntoView();
      this.isValidFormSubmitted = true
      this.isFormSubmitCompleted = true;
      //alert(msg);
      // console.log(data, "success");
      this.joinusForm.reset();
      this.joinusForm.patchValue({
        address: {
          inputCountry: "PL",
          inputState: undefined,
          inputCity: undefined
        }
      }); 
    }, error => {
      console.error(error, "error");
    });
  }

  ngAfterViewInit() {
      this.countryService.getCountriesList().subscribe((data)=>{
        this.AllCountryList = data
      })
      console.log(this.AllCountryList)
      this.fetchStates("Poland")
    
  }
 
  changeCountryTrigger(country:any) {
    this.country = country;
    this.fetchStates(this.country)
    this.isCitiesDataFetched = true;
  }

  fetchStates(country: any) {    
    this.countryService.getStatesList(country).subscribe((data)=> {      
      this.states =  data;      
    });
    this.isCitiesDataFetched = true;
  }
  fetchCities(state: any) {
    this.isCitiesDataFetched = true;
     this.countryService.getCitiesList(state).subscribe((data)=> {
      this.cities =  data;     
      if(this.cities.length > 0) {
        this.isCitiesDataFetched = false; 
       this.joinusForm.patchValue({
         address: {
           inputCity: this.cities[0].city_name
         }
       });
      }
      
    });
  }




}
