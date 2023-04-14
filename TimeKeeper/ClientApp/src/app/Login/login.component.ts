import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DataService } from "../Shared/Server/DataService";
import { ClientAppRoutes } from '../Shared/Routes/ClientAppRoutes';
import { Router } from '@angular/router';
import { User } from 'oidc-client';
import { Storage } from '../Shared/Misc/Storage';
import { UserSession } from '../Shared/Models/UserSession';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  clientAppRoutes: ClientAppRoutes;
  // demoImageCss: string = "url('https://fastly.picsum.photos/id/64/4326/2884.jpg?hmac=9_SzX666YRpR_fOyYStXpfSiJ_edO3ghlSRnH2w09Kg')";
  demoImageCss: string = "url('https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FsZW5kYXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60')";

  // Form elements
  loginForm: FormGroup;
  rememberMe: boolean = false;
  submitButton: HTMLButtonElement | null = null;

  // UI helpers
  errorMessage: string = "";
  loginFinished: boolean = true;

  constructor(private _dataService: DataService, private _router: Router) {
    this.clientAppRoutes = new ClientAppRoutes(this._router);

    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {

    this.submitButton = <HTMLButtonElement | null> document.getElementById("loginSubmitButton");
    this.showErrorMessage(null);

    this.loginForm.valueChanges.subscribe((value: any) => {
    });
  }

  private showErrorMessage(message: string | null): void {
    // _no_err_ is trigger for making the error transparent
    this.errorMessage = message || "_no_err_";
  }

  onLogin(event: any): void {

    if (!this.loginForm.invalid && this.loginFinished) {

      // Setup loading
      this.loginFinished = false;
      this.showErrorMessage(null);

      // Get data
      let loginData = this.loginForm.getRawValue();

      // Make request
      this._dataService.userLogin(loginData, this.rememberMe)
        .then(async (success) => {

          if (success) {
            // Successful login

            debugger;

            // Load data
            this.showErrorMessage("Success! Loading data...");

            let userId = Storage.getUser()?.id;
            if (userId) {
              
              let userData = await UserSession.fetchUserData(parseInt(userId));
              Storage.saveUserData(userData, this.rememberMe);
            }

            this.showErrorMessage(null);

            // Redirect to dashboard
            this.clientAppRoutes.navigateToDashboard();
          }
          else {
            // Invalid login
            this.showErrorMessage("Unsuccessful login!");
          }
        })
        .finally(() => {
          this.loginFinished = true;
        });
    }
  }

}
