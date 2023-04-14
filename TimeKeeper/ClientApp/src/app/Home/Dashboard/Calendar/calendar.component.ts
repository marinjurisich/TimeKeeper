import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Storage } from 'src/app/Shared/Misc/Storage';
import { User } from 'src/app/Shared/Models/User';
import { Workday } from 'src/app/Shared/Models/Workday';
import { ClockInItem } from '../../../Shared/Models/ClockInItem';

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

  fp_inst: any | null;
  selected_date: string = "";

  @Input() receivedClicksCounterFromModal: number = 0;

  constructor() {
  }

  ngOnInit(): void {

    let _win = (<any>window);
    _win.time_keeper = _win.time_keeper || {};
    _win.time_keeper.open_workday_modal = this.open_workday_modal;

    // Initialize calendar
    let dates = this.clock_in_arr.map(o => new ClockInItem("clock_in", new Date(o.date)));
    this.fp_inst = init_fp({
      "clock_in_arr": dates,
    });
  }

  async init_seed_workdays() {
    this.seed_workdays(this.fp_inst).then((workdays: Workday[]) => {
      this.clock_in_arr = workdays;
    });
  }

  ngOnChanges(changes: SimpleChanges) {

    console.log(changes);
    
    setTimeout(() => {
      // Initialize calendar
      let dates = this.clock_in_arr.map(o => new ClockInItem("clock_in", new Date(o.date)));
      init_fp({ "clock_in_arr": dates, });
    }, 1000);
  }

  open_workday_modal(dateIso: string) {

    // Initialize modal elements
    let modal_save = document.getElementById("workday_save_b");
    let modal_open = document.getElementById("workday_modal_open");
    let modal_close = document.getElementById("workday_close_b");

    if (!modal_save || !modal_open || !modal_close) {
      console.log("Cannot find modal elements.");
      return;
    }

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
