import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})


export class AjaxService{

  private readonly requestOptions: any = {
    observe: "body",
    responseType: "json",
    mode: "cors",
    headers: new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST",
      "Sec-Fetch-Mode": "no-cors"
    })
  }

  constructor(private _http: HttpClient) {
  }

  /***** Login *****/
  userLogin(credentials: any): any {
    let apiUrl : string = environment.API_URL + '/user/loginuser';

    console.log("-".repeat(25));
    console.log("Running request...");
    console.log("URL: " + apiUrl);
    console.log("Body:");
    console.log(credentials);
    console.log("-".repeat(25));

    // fetch(apiUrl, {
    //   method: "POST",
    //   body: JSON.stringify(credentials)
    // }).then(res => res.text())
    // .then(txt => {
    // });

    // return this._http.post(apiUrl, credentials);
    return this._http.post(apiUrl, credentials, this.requestOptions);
  }

  /***** Registration *****/
  userRegistration(credentials: any): any {
    let apiUrl : string = environment.API_URL + '/user/register';
    // return this._http.post(apiUrl, credentials);
    return this._http.post(apiUrl, credentials, this.requestOptions);
  }

}
