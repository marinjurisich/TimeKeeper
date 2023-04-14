import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientAppRoutes } from '../../Shared/Routes/ClientAppRoutes';
import { ClockInItem } from 'src/app/Shared/Models/ClockInItem';
import { User } from 'src/app/Shared/Models/User';
import { Storage } from 'src/app/Shared/Misc/Storage';
import { environment } from 'src/environments/environment';
import { Workday } from 'src/app/Shared/Models/Workday';
import { UserSession } from 'src/app/Shared/Models/UserSession';

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

  @Input() user: User | null;
  @Input() receivedClicksCounterFromModal: number = 0;
  // Clock ins of last few months

  user_data: UserSession;
  curr_year = new Date().getFullYear();


  constructor(private _router: Router) {
    this.clientAppRoutes = new ClientAppRoutes(this._router);
    
    // Get logged in user
    this.user = Storage.getUser();
    if (!this.user) {
      this.clientAppRoutes.Logout();
      this.user_data = new UserSession(0, [], []);
    }
    else {
      this.user_data = Storage.getUserData();
    }
  }

  ngOnInit(): void {
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  async seed_workdays() {
    if (this.user && confirm("Seeding data manually will redirect you to login. Continue?")) {
      
      // Set seed parameters
      let user_id = this.user.id;
      let project_id = prompt("Insert project ID (e.g. 1)");
      let d_start = new Date();
      d_start.setDate(d_start.getDate() - 90);
      let d_end = new Date();
      let d_start_iso = d_start.toISOString().substring(0, 10);
      let d_end_iso = d_end.toISOString().substring(0, 10);
  
      // Prepare URL
      let url_args = "user_id=" + user_id +
        "&project_id=" + project_id +
        "&date_start_iso=" + d_start_iso +
        "&date_end_iso=" + d_end_iso;
      let url = environment.API_URL + "/DataSeed/Workdays/?" + url_args;
  
      // Seed dates to DB
      await fetch(url).then(res => res.json());

      // Request log in again to initialize data to Session
      this.clientAppRoutes.Logout();
    }
  }

}
