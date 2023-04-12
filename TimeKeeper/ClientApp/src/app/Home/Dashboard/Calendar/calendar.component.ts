import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Storage } from 'src/app/Shared/Misc/Storage';
import { User } from 'src/app/Shared/Models/User';
import { Workday } from 'src/app/Shared/Models/Workday';

// Defined in /src/assets/js/init-fp.js
declare function init_fp(opt: any): any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Input() clock_in_arr!: Workday[];
  @Input() user!: User | null;
  @Input() fetch_workdays!: (flatpickr_inst: any) => Promise<Workday[]>;
  @Input() seed_workdays!: (flatpickr_inst: any) => Promise<Workday[]>;

  neka_varijabla: string = "asd";

  fp_inst: any | null;

  // Modal data
  modal_workdays: Workday[] = [];  // A day can have several clockins
  modal_hours_total: number = 0;

  @Input() receivedClicksCounterFromModal: number = 0;

  constructor() {
  }

  ngOnInit(): void {

    let _win = (<any>window);
    _win.time_keeper = _win.time_keeper || {};
    _win.time_keeper.open_workday_modal = this.open_workday_modal;

    // Initialize calendar
    this.fp_inst = init_fp({
      "clock_in_arr": this.clock_in_arr,
    });

    // Initialize dates
    this.init_workdays();
  }

  async init_workdays() {
    this.fetch_workdays(this.fp_inst).then((workdays: Workday[]) => {
      this.clock_in_arr = workdays;
      Storage.saveWorkdays(this.clock_in_arr);
    });
  }

  async init_seed_workdays() {
    this.seed_workdays(this.fp_inst).then((workdays: Workday[]) => {
      this.clock_in_arr = workdays;
      Storage.saveWorkdays(this.clock_in_arr);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      // Initialize calendar
      init_fp({ "clock_in_arr": this.clock_in_arr, });
    }, 1000);
  }

  open_workday_modal(dateIso: string) {

    // Initialize modal elements
    let modal_title = document.getElementById("workday_modal_title");
    let modal_save = document.getElementById("workday_save_b");
    let modal_open = document.getElementById("workday_modal_open");
    let modal_close = document.getElementById("workday_close_b");
    let workday_modal_hours = document.getElementById("workday_modal_hours");

    if (!modal_title || !modal_save || !modal_open || !modal_close || !workday_modal_hours) {
      console.log("Cannot find modal elements.");
      return;
    }

    // Initialize arr if needed
    if (!this.clock_in_arr) {
      console.log("Fetching clock_in_arr from session");
      this.clock_in_arr = Storage.getWorkdays();
    }

    // Set up modal
    modal_title.innerText = dateIso;

    // Which workdays to show in modal
    this.modal_workdays = this.clock_in_arr.filter(wd => {
      let wd_date_iso = wd.date.substring(0, 10);
      return wd_date_iso == dateIso;
    })

    // Calculate total work hours
    let total_hours = 0;
    this.modal_workdays.forEach(wd => {
      let clock_in = new Date(wd.clockIn);
      let clock_out = new Date(wd.clockOut);

      let clock_in_hours = (clock_out.getTime() - clock_in.getTime()) / (60 * 60 * 1000);
      total_hours += clock_in_hours;
    });
    total_hours = Math.round(total_hours * 100) / 100;
    workday_modal_hours.innerText = "(" + total_hours + " hours)";

    modal_save.onclick = function () {
      // fetch() // POST
      if (modal_close) {
        modal_close.click();
      }
    }

    // Open modal
    modal_open.click();
  }

}
