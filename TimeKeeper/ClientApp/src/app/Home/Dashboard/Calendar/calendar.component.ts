import { Component, OnInit } from '@angular/core';

// Defined in /src/assets/js/init-fp.js
declare function init_fp(): any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // Initialize calendar
    init_fp()
  }

}
