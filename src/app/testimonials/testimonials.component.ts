import { 
  Component, 
  OnInit  } from '@angular/core';

  //import * as $ from 'jquery';

  import { OwlOptions } from 'ngx-owl-carousel-o';


 

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
		margin: 30,
		nav: false,
		dots: true,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 1
			},
			1000: {
				items: 2
			}
		}
  }
  constructor() { 
   
  }

  ngOnInit(): void {
    

  }
}