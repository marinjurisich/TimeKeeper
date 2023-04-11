import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ClockInItem } from 'src/app/Shared/Models/clock-in-item';

// Defined in /src/assets/js/init-fp.js
declare function init_fp(opt: any): any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

 

  // Workday form
  workdayForm: FormGroup;

  clock_ins: string;

  // Modal management
  modal_title: HTMLElement | null = document.getElementById("workday_modal_title");
  modal_save: HTMLElement | null = document.getElementById("workday_save_b");
  modal_open: HTMLElement | null = document.getElementById("workday_modal_open");
  modal_close: HTMLElement | null = document.getElementById("workday_close_b");

  @Input() clock_in_arr!: ClockInItem[];
  @Input() receivedClicksCounterFromModal: number = 0;

  time_periods: any[] = [
    {
      "clock_in": "13:52",
      "clock_out": "15:50",
      "project_id": 0,
      "project_name": "Some proj",
      "description": "Some desc",
    }
  ];

  constructor() {

    this.clock_ins = "8:59 - 15:00\n" +
      "16:57 - 18:59";

    this.workdayForm = new FormGroup({
    });
  }

  ngOnInit(): void {

    // Initialize calendar
    init_fp({
      "clock_in_arr": this.clock_in_arr,
      // "clock_in_arr": [ new ClockInItem("clock_in", new Date("2023-04-03")) ],
    });

    let _win = (<any>window);
    _win.time_keeper = _win.time_keeper || {};
    _win.time_keeper.open_workday_modal = this.open_workday_modal;
  }

  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      // Initialize calendar
      init_fp({ "clock_in_arr": this.clock_in_arr, });
    }, 1000);
  }

  open_workday_modal(dateIso: string) {

    if (!this.modal_title || !this.modal_save || !this.modal_open || this.modal_close) {
      console.log("Cannot find modal elements.");
      return;
    }

    // Set up modal
    
    let modal_close : HTMLElement | null = this.modal_close;

    this.modal_title.innerText = dateIso;

    this.modal_save.onclick = function () {
      // fetch() // POST
      if (modal_close) {
        modal_close.click();
      }
    }

    // Open modal
    this.modal_open.click();
  }

}
