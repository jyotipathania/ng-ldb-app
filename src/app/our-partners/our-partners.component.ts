import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-our-partners',
  templateUrl: './our-partners.component.html',
  styleUrls: ['./our-partners.component.scss']
})
export class OurPartnersComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: false,
		margin: 30,
		nav: false,
		dots: true,
		responsive: {
			0: {
				items: 1
			},
			480: {
				items: 2
			},
			767: {
				items: 3
			},
			992: {
				items: 4
			}
		}
  }
  constructor() { }

  ngOnInit(): void {
  }

}
