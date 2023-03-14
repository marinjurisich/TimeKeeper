import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../Shared/Server/DataService";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any = null;
  span: HTMLElement | null = null;

  constructor(private _dataService: DataService) {
  }

  ngOnInit(): void {

    this.loginForm = new FormGroup({
      emailAddress: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });

    this.span = document.getElementsByTagName('span')[0];
    this.displaySpan(false);

  }

  onSubmit(): void {

    if (!this.loginForm.invalid) {

        let loginData = this.loginForm.getRawValue();

        this._dataService.userLogin(loginData);
        this._dataService.loggedUserBehaviorSubject.subscribe((res: any) => {
          if (res['status'] == 'OK') { this.displaySpan(false); console.log("SAKRIJ")}
          else { this.displaySpan(true);console.log("PRIKAZI") }
        });

    } else {

      this.displaySpan(true);
    }
  }

  private displaySpan(show: boolean = false, message: string = "Wrong email or password !"): void {
    if (this.span instanceof HTMLElement) {
      this.span.style.display = show ? 'inline' : 'none';
      this.span.innerText = message;
    }
  }

}
