import {Injectable} from "@angular/core";
import {AjaxService} from "./AjaxService";
import {BehaviorSubject} from "rxjs";
import {LocalStorage} from "../User/LocalStorage";
import {User} from "../Models/User";
import { Router } from "@angular/router";
import { ClientAppRoutes } from "../Routes/ClientAppRoutes";

@Injectable({
  providedIn: 'root'
})

export class DataService {

  loggedUserBehaviorSubject: BehaviorSubject<any>;

  readonly clientAppRoutes: ClientAppRoutes;

  constructor(private _router: Router, private _ajaxService: AjaxService) {
    this.loggedUserBehaviorSubject = new BehaviorSubject<any>({});
    this.clientAppRoutes = new ClientAppRoutes(this._router);
  }

  /***** Login *****/
  userLogin(credentials: any): void {
    this._ajaxService.userLogin(credentials)
      .subscribe((res: any) => {
          this.loggedUserBehaviorSubject.next(res);

          if (res["status"] == "OK") {
            console.log("Login OK");
            LocalStorage.setUserToLocalStorage(new User(credentials));
            this.clientAppRoutes.navigateToDashboard();
          } else {
            console.log("Login FAILED");
          }
        }
      );
  }

  /***** Registration *****/
  userRegistration(credentials: any): void {
    this._ajaxService.userRegistration(credentials)
      .subscribe((res: any) => {
          if (res["status"] == "OK") {
            console.log("Registration OK");
            LocalStorage.setUserToLocalStorage(new User(credentials));
            this.clientAppRoutes.navigateToDashboard();
          } else {
            console.log("Registration FAILED");
          }
        }
      );
  }

}
