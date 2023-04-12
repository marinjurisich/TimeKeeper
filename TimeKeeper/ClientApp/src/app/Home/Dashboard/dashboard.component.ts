import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientAppRoutes } from '../../Shared/Routes/ClientAppRoutes';
import { ClockInItem } from 'src/app/Shared/Models/ClockInItem';
import { User } from 'src/app/Shared/Models/User';
import { Storage } from 'src/app/Shared/Misc/Storage';
import { environment } from 'src/environments/environment';
import { Workday } from 'src/app/Shared/Models/Workday';

// Defined in /src/assets/js/init-fp.js
declare function init_fp(opt: any): any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  readonly clientAppRoutes: ClientAppRoutes;

  // Clock ins today
  clock_ins_today: ClockInItem[] = [
    // Demo dates
    // 2023-03-30
    new ClockInItem("clock_in", new Date("2023-03-30 8:58:00")),
    new ClockInItem("clock_out", new Date("2023-03-30 16:02:00")),
    new ClockInItem("clock_in", new Date("2023-03-30 17:49:00")),
    new ClockInItem("clock_out", new Date("2023-03-30 18:52:00")),
    // 2023-03-31
    new ClockInItem("clock_in", new Date("2023-03-31 8:59:00")),
    new ClockInItem("clock_out", new Date("2023-03-31 17:03:00")),
  ];

  // Clock ins of last few months
  clock_in_arr: Workday[] = [];

  curr_year = new Date().getFullYear();

  @Input() user: User | null;
  @Input() receivedClicksCounterFromModal: number = 0;

  constructor(private _router: Router) {
    this.clientAppRoutes = new ClientAppRoutes(this._router);
    
    // Get logged in user
    this.user = Storage.getUser();
    if (!this.user) {
      this.clientAppRoutes.navigateToLogin();
    }
  }

  ngOnInit(): void {
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  async fetch_workdays(flatpickr_inst: any) : Promise<Workday[]> {

    // let workdays_url = environment.API_URL + "/workday/list/" + this.user.id
    let workdays_url = environment.API_URL + "/workday/list/" + 1;

    let workdays = await fetch(workdays_url).then(res => res.json());
    this.clock_in_arr = workdays.map((wd: any) => new Workday(wd));
    
    [
      {
        "id": 1,
        "userId": 1,
        "date": "2023-04-09T18:31:04.1820396",
        "projectId": 1,
        "clockIn": "2023-04-09T08:50:37",
        "clockOut": "2023-04-09T17:01:13",
        "workHours": 8.176666666666666,
        "description": "Worked on Demo Company's demo project",
        "grade": 5,
        "attachment": null
      }
    ]
    
    // Reset flatpickr instance
    let dates = this.clock_in_arr.map(o => new ClockInItem("clock_in", new Date(o.date)));
    flatpickr_inst.destroy();
    flatpickr_inst = init_fp({
      "clock_in_arr": dates,
    });

    return this.clock_in_arr;
  }

  async seed_workdays(flatpickr_inst: any) : Promise<Workday[]> {

    // let user_id = this.user.id;
    let user_id = 1;
    let project_id = 1;
    let d_start = new Date();
    d_start.setDate(d_start.getDate() - 90);
    let d_end = new Date();
    let d_start_iso = d_start.toISOString().substring(0, 10);
    let d_end_iso = d_end.toISOString().substring(0, 10);

    let url_args = "user_id=" + user_id +
      "&project_id=" + project_id +
      "&date_start_iso=" + d_start_iso +
      "&date_end_iso=" + d_end_iso;
    let url = environment.API_URL + "/DataSeed/Workdays/?" + url_args;

    let workdays = await fetch(url).then(res => res.json());

    this.clock_in_arr = workdays.map((wd: any) => new Workday(wd));
    
    // Reset flatpickr instance
    let dates = this.clock_in_arr.map(o => new ClockInItem("clock_in", new Date(o.date)));
    flatpickr_inst.destroy();
    flatpickr_inst = init_fp({
      "clock_in_arr": dates,
    });

    return this.clock_in_arr;
  }

}
