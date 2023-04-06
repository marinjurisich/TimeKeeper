import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DataService } from "../Shared/Server/DataService";
import { ClientAppRoutes } from '../Shared/Routes/ClientAppRoutes';
import { Router } from '@angular/router';
import { User } from 'oidc-client';
import { Storage } from '../Shared/Misc/Storage';

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
    this.errorMessage = message || "";
  }

  onLogin(event: any): void {

    if (!this.loginForm.invalid && this.loginFinished) {

      this.loginFinished = false;
      this.showErrorMessage(null);
      let loginData = this.loginForm.getRawValue();

      this._dataService.userLogin(loginData, this.rememberMe)
        .then(success => {
          if (success) {
            this.showErrorMessage(null);
            this.clientAppRoutes.navigateToDashboard();
          }
          else {
            this.showErrorMessage("Unsuccessful login!");
          }
        })
        .finally(() => {
          this.loginFinished = true;
        });
    }
  }

}
