import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientAppRoutes } from '../../Shared/Routes/ClientAppRoutes';
import { ClockInItem } from 'src/app/Shared/Models/clock-in-item';
import { User } from 'src/app/Shared/Models/User';
import { Storage } from 'src/app/Shared/Misc/Storage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  readonly clientAppRoutes: ClientAppRoutes;

  clock_in_arr: ClockInItem[] = [
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
}
