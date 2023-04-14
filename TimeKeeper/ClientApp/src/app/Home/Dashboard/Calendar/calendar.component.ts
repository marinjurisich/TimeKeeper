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

  old_fp_inst: any | null;

  // Modal data
  selected_date: string = "";
  clock_in_days: string[];

  @Input() receivedClicksCounterFromModal: number = 0;

  constructor(_fp_inst: FlatpickrDirective) {
    this.flatpickrDirective = _fp_inst;
    this.clock_in_days = this.clock_in_arr.map(wd => wd.getDateIso());
  }

  ngOnInit(): void {

    let _win = (<any>window);
    _win.time_keeper = _win.time_keeper || {};
    _win.time_keeper.open_workday_modal = this.open_workday_modal;

    // Initialize calendar
    let dates = this.clock_in_arr.map(o => new ClockInItem("clock_in", new Date(o.date)));
    this.old_fp_inst = init_fp({
      "clock_in_arr": dates,
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
    if (this.clock_in_days.includes(dateIso)) {
      event.dayElement.classList.add("editable");
    }
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
