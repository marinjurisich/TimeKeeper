import {Router} from "@angular/router";

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
  navigateToLogin(): Promise<boolean> | null {
    let path: string = 'Login';
    return this._router ? this._router.navigate([path]) : null;
  }

  /***** Registration route *****/
  navigateToRegister(): Promise<boolean> | null {
    let path: string = 'Register';
    return this._router ? this._router.navigate([path]) : null;
  }

}
