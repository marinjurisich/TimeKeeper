import { Component, OnInit } from '@angular/core';
import { User } from '../Shared/Models/User';
import { ClientAppRoutes } from '../Shared/Routes/ClientAppRoutes';
import { Storage } from 'src/app/Shared/Misc/Storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loggedUser: User | null;

  readonly clientAppRoutes: ClientAppRoutes;

  constructor(private _router:Router) {

    this.clientAppRoutes = new ClientAppRoutes(this._router);

    // Get logged in user
    this.loggedUser = Storage.getUser();
    if (!this.loggedUser) {
      this.clientAppRoutes.Logout();
    }

  }

  ngOnInit(): void {
  }

}
