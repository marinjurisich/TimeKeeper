import { Component, OnInit } from '@angular/core';
import {ClientAppRoutes} from "../../Shared/Routes/ClientAppRoutes";
import {Router} from "@angular/router";

// Declare vanilly JS function that handles sidebar collapsing
declare function setupSidebarToggle(): any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  readonly clientAppRoutes: ClientAppRoutes;

  constructor(private _router:Router) {
    this.clientAppRoutes = new ClientAppRoutes(this._router);
  }

  ngOnInit(): void {
  }

  // Fun function after view renders
  ngAfterViewInit(): void {
    setupSidebarToggle();
  }

}
