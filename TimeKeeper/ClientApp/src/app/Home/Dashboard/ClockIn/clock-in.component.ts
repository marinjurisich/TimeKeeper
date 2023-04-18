import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Storage } from 'src/app/Shared/Misc/Storage';
import { ClockInItem } from 'src/app/Shared/Models/ClockInItem';
import { UserSession } from 'src/app/Shared/Models/UserSession';
import { Workday } from 'src/app/Shared/Models/Workday';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-clock-in',
  templateUrl: './clock-in.component.html',
  styleUrls: ['./clock-in.component.scss']
})
export class ClockInComponent implements OnInit {


  clocked_in: boolean = false;

  @Input() user_data!: UserSession;
  @Output() create_clockin = new EventEmitter<any>()

  clock_ins_today: Workday[] = [];


  constructor() {
  }
  
  
  ngOnInit(): void {

    // Process current workdays
    let today_iso = this.get_iso_date(new Date());
    this.clock_ins_today = this.user_data.workdays.filter(wd => wd.date.startsWith(today_iso));
    this.set_clock_in_flag();

    // Check if there is new version
    this.update_workdays();
  }


  async update_workdays() {

    // Wait for 100ms for server to update
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Fetch
    let workdaysUrl = environment.API_URL + "/Workday/List/" + this.user_data.userId;
    let workdaysLastYear: Workday[] = await fetch(workdaysUrl).then(res => res.json());

    // Filter today
    let today_iso = this.get_iso_date(new Date());
    this.clock_ins_today = workdaysLastYear.filter(wd => wd.date.startsWith(today_iso));

    // Set clock in flag
    this.set_clock_in_flag();
  }


  // Check if user is currently clocked in
  set_clock_in_flag() {

    // If last item does not have clock out, then user is currently clocked in
    let last_clock_in_out = this.clock_ins_today.slice(-1);
    if (last_clock_in_out.length > 0 && !last_clock_in_out[0].clockOut) {
      this.clocked_in = true;
    }
  }



  get_iso_date(d: Date) {
    return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
  }

  get_iso_time(d: Date) {
    return ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
  }

  get_iso_datetime(d: Date) {
    return this.get_iso_date(d) + "T" + this.get_iso_time(d);
  }


  async clock_in() {

    // If clocked in already, or last clock in element does not have clock out, then this is invalid action
    if (this.clocked_in == true ||
      (this.clock_ins_today.length > 0 && !this.clock_ins_today.slice(-1)[0].clockOut)
      ) {
      console.log("Cannot clock in.");
      return;
    }
    let curr_time = new Date();
    
    this.clock_ins_today.push(new Workday({
      id: null,
      userId: this.user_data.userId,
      date: this.get_iso_date(curr_time) + "T00:00:00",
      projectId: null,
      clockIn: this.get_iso_datetime(curr_time),
      clockOut: null,
      workHours: null,
      description: null,
      grade: 5.0,
      attachment: null
    }));
    
    this.clocked_in = true;
  }


  async clock_out() {
    
    // If clocked out already, or if last element has clock out, then this is invalid action
    if (this.clocked_in != true
      || (this.clock_ins_today.length > 0 && this.clock_ins_today.slice(-1)[0].clockOut)
      ) {
      console.log("Cannot clock out.");
      return;
    }

    let workday = this.clock_ins_today.slice(-1)[0];

    let curr_time = new Date();
    workday.clockOut = this.get_iso_datetime(curr_time);
    
    // Open modal and send clock in data
    this.create_clockin.emit({
      "workday": workday
    });

    // Just in case, reset clock ins (if user cancels creation, then changes are discarded)
    let today_iso = this.get_iso_date(new Date());
    this.clock_ins_today = this.user_data.workdays.filter(wd => wd.date.startsWith(today_iso));

    this.clocked_in = false;
  }

}
