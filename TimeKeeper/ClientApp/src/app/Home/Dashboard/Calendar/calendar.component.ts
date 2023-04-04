import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

// Defined in /src/assets/js/init-fp.js
declare function init_fp(): any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  // Workday form
  workdayForm: FormGroup;

  clock_ins: string;

  constructor() {

    this.clock_ins = "8:59 - 15:00\n" +
      "16:57 - 18:59";

    this.workdayForm = new FormGroup({

    });
  }

  ngOnInit(): void {

    // Initialize calendar
    init_fp()
  }

}
