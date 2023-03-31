import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DataService } from "../Shared/Server/DataService";
import { ClientAppRoutes } from '../Shared/Routes/ClientAppRoutes';
import { Router } from '@angular/router';

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
  submitButton: HTMLElement | null;
  errorSpan: HTMLElement | null;

  showError: boolean = false;

  constructor(private _dataService: DataService, private _router: Router) {
    this.clientAppRoutes = new ClientAppRoutes(this._router);

    this.submitButton = document.getElementById("loginSubmitButton");
    this.errorSpan = document.getElementById("errorSpan");

    this.loginForm = new FormGroup({
      emailAddress: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {

    this.displaySpan(false, "");

    this.loginForm.valueChanges.subscribe((value: any) => {
      //@ts-ignore
      //this.submitButton.disabled = this.loginForm.invalid;
    });
  }

  onLogin(event: any): void {

    // console.log("rememberMe value: " + this.rememberMe.toString());
    // console.log(this.loginForm.getRawValue());
    // this.clientAppRoutes.navigateToHome();

    if (!this.loginForm.invalid) {

      let loginData = this.loginForm.getRawValue();

      this._dataService.userLogin(loginData, this.rememberMe);
      this._dataService.loggedUserBehaviorSubject.subscribe((res: any) => {
        
        if (res['status'] == 'OK') {
          this.displaySpan(false, "");
          this.clientAppRoutes.navigateToHome();
        }
        else {
          this.displaySpan(true, "Wrong email or password!");
        }
      });

    }
    else {
      this.displaySpan(true, "Incomplete data!");
    }
  }

  private displaySpan(show: boolean, message: string): void {

    console.log("Trying to " + (show ? "show" : "hide") + " the span... (old login)");

    this.showError = show;
    if (this.errorSpan) {
      this.errorSpan.innerText = message;
    }
  }

}
