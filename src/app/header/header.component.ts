import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  localesList = [
    { code: "en-US", label: "EN"},
    { code: "pl", label: "PL"}
  ]
  constructor() { }

  ngOnInit(): void {
    $(function(){
      // Menu Dropdown Toggle
      if ($('.menu-trigger').length) {
        $(".menu-trigger").on('click', function () {
          $(this).toggleClass('active');
          $('.header-area .nav').slideToggle(200);
        });
      }
    })
  }

}
