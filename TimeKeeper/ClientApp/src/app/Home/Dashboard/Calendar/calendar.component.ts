import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Storage } from 'src/app/Shared/Misc/Storage';
import { User } from 'src/app/Shared/Models/User';
import { Workday } from 'src/app/Shared/Models/Workday';
import { ClockInItem } from '../../../Shared/Models/ClockInItem';
import { FlatpickrDefaultsInterface, FlatpickrDirective } from 'angularx-flatpickr';
import { FlatPickrDayCreateOutputOptions } from 'angularx-flatpickr/lib/flatpickr.directive';
import { FlatPickrOutputOptions } from 'angularx-flatpickr/lib/flatpickr.directive';

// Defined in /src/assets/js/init-fp.js
declare function init_fp(opt: any): any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [FlatpickrDirective]
})
export class CalendarComponent implements OnInit {

  @Input() clock_in_arr!: Workday[];
  @Input() user!: User | null;
  @Input() fetch_workdays!: () => Promise<void>;
  @Input() seed_workdays!: () => Promise<void>;

  clock_in_dates: string[];

  flatpickrDirective: FlatpickrDirective;
  fp_date: string = "";
  fp_options: FlatpickrDefaultsInterface = {
    dateFormat: "Y-m-d",
    inline: true,
    locale: {
      firstDayOfWeek: 1
    },
    showMonths: 2,
    maxDate: new Date(),
  }

  // Modal data
  modal_workdays: Workday[] = [];  // A day can have several clockins
  modal_hours_total: number = 0;

  @Input() receivedClicksCounterFromModal: number = 0;

  constructor(_fp_inst: FlatpickrDirective) {
    this.flatpickrDirective = _fp_inst;
    this.clock_in_dates = [];
  }

  ngOnInit(): void {

    let _win = (<any>window);
    _win.time_keeper = _win.time_keeper || {};
    _win.time_keeper.open_workday_modal = this.open_workday_modal;
  }

  ngOnChanges(changes: SimpleChanges) {
    setTimeout(() => {
      // Initialize calendar
      let dates = this.clock_in_arr.map(o => new ClockInItem("clock_in", new Date(o.date)));
      init_fp({ "clock_in_arr": dates, });
    }, 1000);
  }

  async init_workdays() {

    // Update clock_in_array (through parent)
    await this.fetch_workdays();

    // Save array and update component
    Storage.saveWorkdays(this.clock_in_arr);
    this.clock_in_dates = this.clock_in_arr.map(wd => wd.getDateIso());
    this.flatpickrDirective.instance.redraw();
  }

  async init_seed_workdays() {

    // Update clock_in_array (through parent)
    this.seed_workdays();

    // Save array and update component
    Storage.saveWorkdays(this.clock_in_arr);
    this.clock_in_dates = this.clock_in_arr.map(wd => wd.getDateIso());
    this.flatpickrDirective.instance.redraw();
  }

  // fp_on_change(date: Date, date_iso: string, instance: any) {
  fp_on_change(event: FlatPickrOutputOptions) {
    console.log(event.instance);
  }

  redrawFp() {
    console.log(this.flatpickrDirective);
    this.flatpickrDirective.disable = []
    this.flatpickrDirective.instance.redraw();
  }

  // fp_on_day_create(dayElement: HTMLElement) {
  fp_on_day_create(event: FlatPickrDayCreateOutputOptions) {

    console.log("- Generating day...");

    let date: Date = (<any> event.dayElement).dateObj;
    let dateIso = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);

    // If there are clock ins for this date
    if (this.clock_in_dates.includes(dateIso)) {
      event.dayElement.classList.add("editable");
    }
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
