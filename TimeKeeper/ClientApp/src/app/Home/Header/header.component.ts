import { Component, OnInit } from '@angular/core';
import { ClientAppRoutes } from '../../Shared/Routes/ClientAppRoutes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  clientAppRoutes: ClientAppRoutes;

  constructor(private _router: Router) {
    this.clientAppRoutes = new ClientAppRoutes(this._router);
  }

  ngOnInit(): void {
  }

}
