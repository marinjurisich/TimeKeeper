import { Injectable } from "@angular/core";
import { AjaxService } from "./AjaxService";
import { BehaviorSubject } from "rxjs";
import { Storage } from "../Misc/Storage";
import { User } from "../Models/User";

@Injectable({
  providedIn: 'root'
})

export class DataService {

  loggedUserBehaviorSubject: BehaviorSubject<any>;

  constructor(private _ajaxService: AjaxService) {
    this.loggedUserBehaviorSubject = new BehaviorSubject<any>({});
  }

  /***** Login *****/
  userLogin(credentials: any, rememberMe: boolean = false): void {

    this._ajaxService.userLogin(credentials)
      .subscribe((res: any) => {

        this.loggedUserBehaviorSubject.next(res);

        if (res["status"] == "OK") {
          Storage.saveUser(new User(credentials), rememberMe);
        }
        else {
          console.log("Login FAILED");
        }
      }
      );
  }

  /***** Registration *****/
  userRegistration(credentials: any, rememberMe: boolean = false): void {

    this._ajaxService.userRegistration(credentials)
      .subscribe((res: any) => {

        if (res["status"] == "OK") {
          Storage.saveUser(new User(credentials), rememberMe);
        }
        else {
          console.log("Registration FAILED");
        }
      }
      );
  }

}
