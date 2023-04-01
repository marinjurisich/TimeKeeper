import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientAppRoutes } from '../../Shared/Routes/ClientAppRoutes';
import { LocalStorage } from '../../Shared/User/LocalStorage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  readonly clientAppRoutes: ClientAppRoutes;

  constructor(private _router: Router) {
    this.clientAppRoutes = new ClientAppRoutes(this._router);


    let user: any = LocalStorage.getUserFromLocalStorage();

    if (user == null) {
      //No user, redirecting to login page
      /*this.clientAppRoutes.navigateToLogin();*/
    }
  }

  ngOnInit(): void {
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
