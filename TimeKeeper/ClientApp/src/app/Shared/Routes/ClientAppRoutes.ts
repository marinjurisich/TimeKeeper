import {Router} from "@angular/router";

export class ClientAppRoutes {

  constructor(private _router: Router) {
  }

  /***** App home ROUTE *****/
  navigateToHome(): Promise<boolean> | null {
    let path: string = '';
    return this._router ? this._router.navigate([path]) : null;
  }

  /***** LOGIN ROUTE *****/
  navigateToLogin(): Promise<boolean> | null {
    let path: string = 'login';
    return this._router ? this._router.navigate([path]) : null;
  }

  /***** REGISTRATION ROUTE *****/
  navigateToRegister(): Promise<boolean> | null {
    let path: string = 'register';
    return this._router ? this._router.navigate([path]) : null;
  }

}
