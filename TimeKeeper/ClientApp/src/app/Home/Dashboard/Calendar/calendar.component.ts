import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Storage } from 'src/app/Shared/Misc/Storage';
import { User } from 'src/app/Shared/Models/User';
import { Workday } from 'src/app/Shared/Models/Workday';
import { ClockInItem } from '../../../Shared/Models/ClockInItem';
import { FlatpickrDefaultsInterface, FlatpickrDirective } from 'angularx-flatpickr';
import { FlatPickrDayCreateOutputOptions } from 'angularx-flatpickr/lib/flatpickr.directive';
import { FlatPickrOutputOptions } from 'angularx-flatpickr/lib/flatpickr.directive';
import { UserSession } from 'src/app/Shared/Models/UserSession';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [FlatpickrDirective]
})
export class CalendarComponent implements OnInit {

  @Input() clock_in_arr!: Workday[];
  @Input() user!: User | null;
  @Input() seed_workdays!: () => Promise<void>;
  @Input() user_data!: UserSession;

  flatpickrDirective: FlatpickrDirective;
  fp_date: string = "";
  fp_options: FlatpickrDefaultsInterface = {
    dateFormat: "Y-m-d",
    inline: true,
    locale: {
      firstDayOfWeek: 1
    },
    showMonths: 1,
    maxDate: new Date(),
  }

  old_fp_inst: any | null;

  // Modal data
  selected_date: string = "";
  clock_in_days: string[] | null = null;

  @Input() receivedClicksCounterFromModal: number = 0;

  modal_save: HTMLElement | null = null;
  modal_open: HTMLElement | null = null;
  modal_close: HTMLElement | null = null;

  // Workday creation
  show_create_workday: boolean = true;

  constructor(_fp_inst: FlatpickrDirective) {

    this.flatpickrDirective = _fp_inst;
    
    // Decide how many calendars to show
    if (window.innerWidth >= 1500) {
      this.fp_options.showMonths = 4;
    }
    else if (window.innerWidth >= 1100) {
      this.fp_options.showMonths = 3;
    }
    else if (window.innerWidth >= 750) {
      this.fp_options.showMonths = 2;
    }
  }


  ngOnInit(): void {
    this.modal_save = document.getElementById("workday_save_b");
    this.modal_open = document.getElementById("workday_modal_open");
    this.modal_close = document.getElementById("workday_close_b");

    // Refresh workdays
    this.reload_workdays();
  }


  ngOnChanges(changes: SimpleChanges) {
   
    setTimeout(() => {
      // TODO: fixati
      // // Initialize calendar
      // let dates = this.user_data.workdays.map(o => new ClockInItem("clock_in", new Date(o.date)));
      // init_fp({ "clock_in_arr": dates, });
    }, 1000);
  }


  async reload_workdays() {
    
    let workdaysUrl = environment.API_URL + "/Workday/List/" + this.user?.id;
    let workdaysLastYear = await fetch(workdaysUrl).then(res => res.json());
    this.user_data.workdays = workdaysLastYear;
    if (sessionStorage.getItem(Storage.userKey)) {
      Storage.saveUserData(this.user_data, false);
    }
    else {
      Storage.saveUserData(this.user_data, true);
    }
  }


  async fp_on_ready(event: FlatPickrOutputOptions) {

    // Wait 50ms for DOM to render
    await new Promise(resolve => setTimeout(resolve, 50));

    // Change months so that current month is last one
    let showMonths = this.fp_options.showMonths || 1;
    if (showMonths > 1) {
      event.instance.changeMonth(-showMonths + 1);
    }
  }


  get_today_iso_date() {
    let d = new Date();
    let isoDate = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
    return isoDate;
  }


  fp_on_change(event: FlatPickrOutputOptions) {

    let self = this;
    setTimeout(function() {

      // If button is available and if there are workdays on this date
      if (self.modal_open && self.selected_date && self.filter_workday_days(self.selected_date).length > 0) {
        self.modal_open.click();
      }
    }, 10);
  }


  fp_on_day_create(event: FlatPickrDayCreateOutputOptions) {

    let date: Date = (<any> event.dayElement).dateObj;
    let dateIso = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);

    // Update clock in dates if needed
    if (!this.clock_in_days) {
      this.clock_in_days = this.user_data.workdays.map(wd => wd.date.split("T")[0]);
    }

    // If there are clock ins for this date
    if (this.clock_in_days.includes(dateIso)) {
      event.dayElement.classList.add("editable");
    }

    // This is a weekend
    if (date.getDay() == 0 || date.getDay() == 6) {
      event.dayElement.classList.add("weekend");
    }
  }


  init_seed_workdays() {
    this.seed_workdays();
  }


  filter_workday_days(dateIso: string) {
    return this.user_data.workdays.filter(wd => wd.date.startsWith(dateIso));
  }


  async save_workday(workday_id: number, eventTarget: EventTarget | null) {

    debugger;

    // Get HTML containers
    let wd_container = document.querySelector("#workDayModal [data-workday_id='" + workday_id + "']");
    let i_clockin:     HTMLInputElement | null | undefined = wd_container?.querySelector("[data-workday_clock_in_date]");
    let i_clockout:    HTMLInputElement | null | undefined = wd_container?.querySelector("[data-workday_clock_out_date]");
    let i_project:     HTMLInputElement | null | undefined = wd_container?.querySelector("[data-workday_project]");
    let i_description: HTMLInputElement | null | undefined = wd_container?.querySelector("[data-workday_description]");
    let button = <HTMLButtonElement>eventTarget;

    // Check if containers found
    if (!wd_container || !i_clockin || !i_clockout || !i_project || !i_description) {
      console.log("Cannot find workday with ID " + workday_id);
      return;
    }

    // Validate dates
    let clockInString = i_clockin.dataset.workday_clock_in_date + "T" + i_clockin.value
    let clockIn = new Date(clockInString);
    let clockOutString = i_clockout.dataset.workday_clock_out_date + "T" + i_clockout.value;
    let clockOut = new Date(clockOutString);

    if (clockOut < clockIn) {
      console.log("Clock in must come after clock out");
      return;
    }

    if (!(clockIn instanceof Date && !isNaN(clockIn.getTime()))
      || !(clockOut instanceof Date && !isNaN(clockOut.getTime()))
      ) {
      console.log("Dates are invalid");
    }
    
    // Create workday
    let userId = (<HTMLElement>wd_container).dataset.user_id;
    let date = (<HTMLElement>wd_container).dataset.workday_date;
    let workHours = (clockOut.getTime() - clockIn.getTime()) / (60*60*1000);
    let workday_update = new Workday({
      id: workday_id,
      userId: userId,
      date: date,
      projectId: i_project.value,
      clockIn: clockInString,
      clockOut: clockOutString,
      workHours: workHours,
      description: i_description.value,
      grade: 5.0,
      attachment: "-"
    });

    // Disable until request is finished
    button.disabled = true;

    // Save workday
    let updateWorkdayUrl = environment.API_URL + "/Workday/Update"
    await fetch(updateWorkdayUrl, {
      method: "POST",
      body: JSON.stringify(workday_update)
    });

    // Refill user data with reload of page
    location.reload();

    // Now enable saving
    button.disabled = false;
  }

  // Create workday from template
  async create_workday() {

  }

}
