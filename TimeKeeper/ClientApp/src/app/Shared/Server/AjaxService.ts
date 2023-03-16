import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})


export class AjaxService{

  private readonly _urlPrefix: string;

  constructor(private _http: HttpClient) {
    this._urlPrefix = environment.API_URL + '/api';
  }

  /***** Login *****/
  userLogin(credentials: any): any {
    let apiUrl : string = this._urlPrefix + '/login';
    return this._http.post(apiUrl, credentials);
  }

  /***** Registration *****/
  userRegistration(credentials: any): any {
    let apiUrl : string = this._urlPrefix + '/registration';
    return this._http.post(apiUrl, credentials);
  }

}
