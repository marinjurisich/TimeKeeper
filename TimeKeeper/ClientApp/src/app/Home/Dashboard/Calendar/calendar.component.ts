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
  show_create_workday: boolean = false;
  new_wd_date: string = "";
  new_wd_clockin: string = "";
  new_wd_clockout: string = "";
  new_wd_description: string = "";

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
  }


  ngOnChanges(changes: SimpleChanges) {
   
    setTimeout(() => {
      // TODO: fixati
      // // Initialize calendar
      // let dates = this.user_data.workdays.map(o => new ClockInItem("clock_in", new Date(o.date)));
      // init_fp({ "clock_in_arr": dates, });
    }, 1000);
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


  get_iso_hh_mm(d: Date) {
    let iso_time = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    return iso_time;
  }


  get_iso_date(d: Date) {
    let isoDate = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
    return isoDate;
  }


  get_today_iso_date() {
    let d = new Date();
    return this.get_iso_date(d);
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


  async save_all_modal() {

    // Get all workdays
    let wd_el_list = Array.from(document.querySelectorAll("#workDayModal .modal-body > [data-workday_id]"));

    // Save all
    for (let i = 0; i < wd_el_list.length; ++i) {

      let wd_element = <HTMLElement> wd_el_list[i];
      let workday_id = wd_element.dataset.workday_id;
      
      if (workday_id) {
        wd_element.style.opacity = "0.5";
        await this.save_workday(parseInt(workday_id), null);
        wd_element.style.opacity = "";
      }
    }

    // Now refresh dates
    location.reload()
  }


  async save_workday(workday_id: number, eventTarget: EventTarget | null) {

    // Get HTML containers
    let wd_container = document.querySelector("#workDayModal [data-workday_id='" + workday_id + "']");
    let i_clockin:     HTMLInputElement | null | undefined = wd_container?.querySelector("[data-workday_clock_in_date]");
    let i_clockout:    HTMLInputElement | null | undefined = wd_container?.querySelector("[data-workday_clock_out_date]");
    let i_project:     HTMLInputElement | null | undefined = wd_container?.querySelector("[data-workday_project]");
    let i_description: HTMLInputElement | null | undefined = wd_container?.querySelector("[data-workday_description]");
    let button = <HTMLButtonElement | null>eventTarget;

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
      attachment: null
    });

    // Disable until request is finished
    if (button) {
      button.disabled = true;
    }

    // Save workday
    let updateWorkdayUrl = environment.API_URL + "/Workday/Update"
    await fetch(updateWorkdayUrl, {
      method: "POST",
      body: JSON.stringify(workday_update)
    });

    // Refill user data with reload of page
    if (button) {
      button.disabled = false;  // Reset button
      location.reload();
    }
  }


  // Initialize creation of new clock in
  init_create_workday(event: any) {

    let workday: Workday = event["workday"];

    this.new_wd_date = workday.date;
    this.new_wd_clockin = workday.clockIn.split("T")[1].substring(0, 5);
    this.new_wd_clockout = workday.clockOut.split("T")[1].substring(0, 5);

    this.show_create_workday = true;
    this.selected_date = workday.date.split("T")[0];
    this.modal_open?.click();
  }
  

  // Create workday from template
  async create_workday(eventTarget: EventTarget | null) {

    let projectEl = document.querySelector("#workDayModal .new-workday [data-workday_project]");
    if (!projectEl) {
      alert("Cannot create workday. Project missing.");
      return;
    }

    let projectId = (<HTMLInputElement>projectEl).value;
    let clockInStr = this.new_wd_date.split("T")[0] + "T" + this.new_wd_clockin + ":00";
    let clockOutStr = this.new_wd_date.split("T")[0] + "T" + this.new_wd_clockout + ":00";
    let clockIn = new Date(clockInStr);
    let clockOut = new Date(clockOutStr);
    let workHours = (clockOut.getTime() - clockIn.getTime()) / (60*60*1000);

    if (!projectId) {
      alert("Please select project before proceeding.");
      return;
    }

    let workday_create = new Workday({
      id: 0,
      userId: this.user_data.userId,
      date: this.new_wd_date,
      projectId: projectId,
      clockIn: clockInStr,
      clockOut: clockOutStr,
      workHours: workHours,
      description: this.new_wd_description,
      grade: 5.0,
      attachment: null
    });

    let button = <HTMLButtonElement | null> eventTarget;
    if (button) {
      button.disabled = true;
    }

    // Create workday
    let createWorkdayUrl = environment.API_URL + "/Workday/ClockInOut";
    await fetch(createWorkdayUrl, {
      method: "POST",
      body: JSON.stringify(workday_create)
    })

    if (button) {
      button.disabled = false;
    }
    
    // Reload to refresh cache
    location.reload();
  }

}
