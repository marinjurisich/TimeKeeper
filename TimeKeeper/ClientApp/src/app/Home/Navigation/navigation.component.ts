import { Component, OnInit } from '@angular/core';
import {ClientAppRoutes} from "../../Shared/Routes/ClientAppRoutes";
import {Router} from "@angular/router";

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


    window.onscroll = () => {

      let navigationContent = document.getElementById("navigation-content");
      let currentScrollY = window.scrollY;

      if (navigationContent) {
        navigationContent.style.position = "absolute";
        navigationContent.style.top = currentScrollY + "px";
      }

    }
   


  }

}
