import { Component, OnInit } from '@angular/core';
import {ClientAppRoutes} from "../../Shared/Routes/ClientAppRoutes";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  readonly clientAppRoutes: ClientAppRoutes;

  constructor(private _router:Router) {
    this.clientAppRoutes = new ClientAppRoutes(this._router);
  }

  ngOnInit(): void {
  }

}
