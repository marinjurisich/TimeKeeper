import {Router} from "@angular/router";
import { Storage } from "../Misc/Storage";

export class ClientAppRoutes {

  constructor(private _router: Router) {
  }

  /***** App dashboard route *****/
  navigateToDashboard(): Promise<boolean> | null {
    let path: string = '';
    return this._router ? this._router.navigate([path]) : null;
  }

  /***** App users route *****/
  navigateToUsers(): Promise<boolean> | null {
    let path: string = 'Users';
    return this._router ? this._router.navigate([path]) : null;
  }

  /***** Login route *****/
  Logout(): Promise<boolean> | null {
    Storage.userLogout()  // This function is Log out, so delete user data
    let path: string = 'Login';
    return this._router ? this._router.navigate([path]) : null;
  }

  /***** Registration route *****/
  navigateToRegister(): Promise<boolean> | null {
    let path: string = 'Register';
    return this._router ? this._router.navigate([path]) : null;
  }

}
