import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientAppRoutes } from '../../Shared/Routes/ClientAppRoutes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  readonly clientAppRoutes: ClientAppRoutes;

  constructor(private _router: Router) {
    this.clientAppRoutes = new ClientAppRoutes(this._router);
  }

  ngOnInit(): void {
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
