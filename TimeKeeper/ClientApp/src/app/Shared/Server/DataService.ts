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

      let apiUrl: string = environment.API_URL + '/user/loginuser';
      let body = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(credentials)
      }).then(
        res => res.status == 200 ? res.json() : null
      );

      if (body) {
        Storage.saveUser(new User(body), rememberMe);
        isLoggedIn = true;
      }
    }
    catch (exc) {
      console.log(exc)
    }

    return isLoggedIn;
  }

  /***** Registration *****/
  async userRegistration(data: any): Promise<boolean> {
    
    let successfulRegister = false;
    try {

      //let companyCreate: string = environment.API_URL + "/company/register";

      let userCreate: string = environment.API_URL + '/user/registerAdmin';
      let userBody = await fetch(userCreate, {
        method: "POST",
        body: JSON.stringify(data)
      }).then(
        res => res.status == 200 ? res.json() : null
      );

      if (userBody) {
        Storage.saveUser(new User(userBody), false);
        successfulRegister = true;
      }
    }
    catch (exc) {
      console.log(exc)
    }
    return successfulRegister;
  }

  // List users (e.g. for company 1)
  async listUsers(companyId: Number): Promise<User[] | null> {

    let apiUrl: string = environment.API_URL + '/user/getallusers/' + companyId;
    let response = await fetch(apiUrl).then(
      res => res.status == 200 ? res.json() : null
    );

    if (response) {
      return response.map((userJson: any) => new User(userJson));
    }
    return null;
  }

  //Admin creating new USER
  async userRegistrationModal(data: any): Promise<string | null> {
    let apiUrl: string = environment.API_URL + '/user/register';
    let response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(data)
    }).then(
      res => res.status == 200 ? "OK" : null
    );
    return response;
  }

  //Admin deleting user
  async deleteUser(userId: Number): Promise<any | null> {
    let apiUrl: string = environment.API_URL + '/user/delete/' + userId;
    let response = await fetch(apiUrl).then((res) => res.status == 200 ? res.json() : null);
    return response;
  }

  //Admin updating user
  async updateUser(data: any): Promise<any | null> {

    let apiUrl: string = environment.API_URL + '/user/update/';
    let response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(data)
    }).then(
      res => res.status == 200 ? res.json() : null
    );
    return response;
  }
}
