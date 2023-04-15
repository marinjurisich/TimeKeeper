import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ClockInItem } from 'src/app/Shared/Models/ClockInItem';
import { UserSession } from 'src/app/Shared/Models/UserSession';
import { Workday } from 'src/app/Shared/Models/Workday';

@Component({
  selector: 'app-clock-in',
  templateUrl: './clock-in.component.html',
  styleUrls: ['./clock-in.component.scss']
})
export class ClockInComponent implements OnInit {

  clocked_in: boolean = false;
  sending_request: boolean = false; // If true, then component is in middle of sending a check in / check out

  @Input() user_data!: UserSession;
  @Output() user_dataChange = new EventEmitter<UserSession>()


  constructor() {
  }

  ngOnInit(): void {

    // Set clock in flag
    this.set_clock_in_flag();
  }

  set_clock_in_flag() {
    let last_clock_in_out = this.filter_workdays_today().slice(-1);
    if (last_clock_in_out.length > 0 && !last_clock_in_out[0].clockOut) {
      this.clocked_in = true;
    }
  }

  async clock_in() {

    if (this.sending_request) {
      // Cannot send while another request is being sent
      return;
    }

    if (this.clocked_in == true) {
      console.log("Cannot clock in.");
      return;
    }

    // Simulate request send
    this.sending_request = true;
    await new Promise(resolve => setTimeout(resolve, 500));
    this.sending_request = false;
    
    // TODO: finish
    
    this.clocked_in = true;
  }

  async clock_out() {
    
    if (this.sending_request) {
      // Cannot send while another request is being sent
      return;
    }

    if (this.clocked_in != true) {
      console.log("Cannot clock out.");
      return;
    }

    // Simulate request send
    this.sending_request = true;
    await new Promise(resolve => setTimeout(resolve, 500));
    this.sending_request = false;
    
    // TODO: finish

    this.clocked_in = false;
  }

  // Take only clock ins and outs that happened today
  filter_workdays_today(): Workday[] {

    let today = new Date();
    let today_iso = today.getFullYear() + "-" + ("0" + (today.getMonth() + 1)).slice(-2) + "-" + ("0" + today.getDate()).slice(-2);

    return this.user_data.workdays.filter(wd => wd.date.startsWith(today_iso));
  }

}
