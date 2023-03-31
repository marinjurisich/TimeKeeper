import { Injectable } from "@angular/core";
import { AjaxService } from "./AjaxService";
import { BehaviorSubject } from "rxjs";
import { Storage } from "../Misc/Storage";
import { User } from "../Models/User";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})

export class DataService {

  loggedUserBehaviorSubject: BehaviorSubject<any>;

  constructor(private _ajaxService: AjaxService) {
    this.loggedUserBehaviorSubject = new BehaviorSubject<any>({});
  }

  /***** Login *****/
  async userLogin(credentials: any, rememberMe: boolean = false): Promise<boolean> {
    
    let isLoggedIn = false;
    try {

      debugger;

      let apiUrl: string = environment.API_URL + '/user/loginuser';
      let res = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(credentials)
      });

      if (res.status === 200) {
        Storage.saveUser(new User(credentials), rememberMe);
      }

      true || this._ajaxService.userLogin(credentials)
        .subscribe((res: any) => {

          this.loggedUserBehaviorSubject.next(res);

          if (res["status"] == "OK") {
            Storage.saveUser(new User(credentials), rememberMe);
          }
          else {
            console.log("Login FAILED");
          }
        });
    }
    catch (exc) {
      console.log(exc)
    }

    return isLoggedIn;
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
