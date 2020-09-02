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
  isAlreadyEmployed: boolean = true;
  isNetWageActive: boolean = true;
  contractListItems :any = ["Contract of employment", "Contract work", "Contract of mandate"];
  selectedContract:string;
  iAgreePP: boolean = false;
  //Reactive form init
  //https://www.concretepage.com/angular-2/angular-2-4-email-validation-example
  //https://stackoverflow.com/questions/49371955/angular-4-reactive-forms-toggle-validation-for-hidden-form-elements
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
      }),
      isStudent: ["Yes"],
      ageCheck: ["Yes"],
      isAlreadyEmployed: ["Yes"],
      contractType: ["", Validators.required],
      isWageAboveThreshold: ["Yes"],
      netWage:["", [
        Validators.required
      ]],
      iAgreePP: ["", Validators.required]
      
    })
  }

  onSubmit(form: FormGroup) {
    
    if(form.invalid) {
      debugger;
      
      for (const key of Object.keys(form.controls)) {
        if (form.controls[key].invalid) {
          if(typeof form.controls[key]['controls'] === "object"){
            for (const subkey of Object.keys(form.controls[key]['controls'])) {
              console.log(subkey)
              if (form.controls[key]['controls'][subkey].invalid) {
                let invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + subkey + '"]');
                invalidControl.focus();
                break;
              }
              
            }
            break;
          } else {
            let invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
            invalidControl.focus();
            break;
          }
          
         
       }
  }
      return;
    }
    this.isFormSubmitCompleted = false;
   

   // console.log("FirstName: ", form.value);
    this.sendmailservice.sendEmail(form.value).
    
    subscribe(data => {
      debugger;
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
        },
        netWage: "",
        contractType: undefined,
        isStudent: "Yes",
      ageCheck: "Yes",
      isAlreadyEmployed: "Yes",
      isWageAboveThreshold: "Yes",
      iAgreePP: ""
      });
      this.isAlreadyEmployed = true;
      this.isNetWageActive = true; 
    }, error => {
      console.error(error, "error");
    });
  }



 handleEmploymentStatus(e) {
    if(e.target.value === "Yes") {
      this.isAlreadyEmployed = true;
      this.joinusForm.get('contractType').enable();
    } else {
      this.isAlreadyEmployed = false;
      this.joinusForm.patchValue({
        contractType: undefined
      });
      this.joinusForm.get('contractType').disable();
    }
 }
 handleWageStatus(e) {
  if(e.target.value === "Yes") {
    this.isNetWageActive = true;
    this.joinusForm.get('netWage').enable();
  } else {
    this.isNetWageActive = false;
    this.joinusForm.patchValue({
      netWage: ""
    });
    this.joinusForm.get('netWage').disable();
  }
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
