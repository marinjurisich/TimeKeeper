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

  constructor() {

    this.workdayForm = new FormGroup({

    });
  }

  ngOnInit(): void {

    // Initialize calendar
    init_fp()
  }

}
