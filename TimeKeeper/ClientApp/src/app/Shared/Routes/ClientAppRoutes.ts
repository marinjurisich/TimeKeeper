import {Router} from "@angular/router";

export class ClientAppRoutes {

  constructor(private _router: Router) {
  }

  /***** App home route *****/
  navigateToHome(): Promise<boolean> | null {
    let path: string = '';
    return this._router ? this._router.navigate([path]) : null;
  }

  /***** Login route *****/
  navigateToLogin(): Promise<boolean> | null {
    let path: string = 'login';
    return this._router ? this._router.navigate([path]) : null;
  }

  /***** Registration route *****/
  navigateToRegister(): Promise<boolean> | null {
    let path: string = 'register';
    return this._router ? this._router.navigate([path]) : null;
  }

}
