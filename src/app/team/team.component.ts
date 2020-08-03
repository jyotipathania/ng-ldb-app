import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
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
