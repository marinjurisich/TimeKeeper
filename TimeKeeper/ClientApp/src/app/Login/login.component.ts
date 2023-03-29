import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DataService } from "../Shared/Server/DataService";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: any = null;
  span: HTMLElement | null = null;
  submitButton: HTMLElement | null = null;

  constructor(private _dataService: DataService) {
  }

  ngOnInit(): void {

    this.span = document.getElementsByTagName('span')[0];
    this.submitButton = document.getElementsByTagName('button')[0];

    this.loginForm = new FormGroup({
      emailAddress: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });

    this.displaySpan(false);

    this.loginForm.valueChanges.subscribe((value: any) => {
      //@ts-ignore
      this.submitButton.disabled = this.loginForm.invalid;
    });
  }

  onLogin(event: any): void {

    let button = event.target;

    if (!this.loginForm.invalid) {

      let loginData = this.loginForm.getRawValue();

      this._dataService.userLogin(loginData);
      this._dataService.loggedUserBehaviorSubject.subscribe((res: any) => {
        if (res['status'] == 'OK') { this.displaySpan(false); console.log("SAKRIJ") }
        else { this.displaySpan(true); console.log("PRIKAZI") }
      });

    } else {

      this.displaySpan(true);
    }
  }

  private displaySpan(show: boolean = false, message: string = "Wrong email or password !"): void {
    if (this.submitButton instanceof HTMLElement && this.span instanceof HTMLElement) {
      this.span.style.visibility = show ? 'visible' : 'hidden';
      //@ts-ignore
      this.submitButton.disabled = show;
      this.span.innerText = message;
    }
  }

}
