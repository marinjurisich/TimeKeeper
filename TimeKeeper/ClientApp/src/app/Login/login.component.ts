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

  demoImageCss: string = "url('https://fastly.picsum.photos/id/64/4326/2884.jpg?hmac=9_SzX666YRpR_fOyYStXpfSiJ_edO3ghlSRnH2w09Kg')";

  loginForm: any = null;
  span: HTMLElement | null = null;
  submitButton: HTMLElement | null = null;
  clientAppRoutes: ClientAppRoutes;

  constructor(private _dataService: DataService, private _router: Router) {
    this.clientAppRoutes = new ClientAppRoutes(this._router);
  }

  ngOnInit(): void {

    // TODO
    this.span = document.getElementsByTagName('span')[0];

    // TODO - fix tagname
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
        
        if (res['status'] == 'OK') {
          this.displaySpan(false);
          console.log("SAKRIJ")
        }
        else {
          this.displaySpan(true);
          console.log("PRIKAZI");
        }
      });

    } else {

      this.displaySpan(true);
    }
  }

  private displaySpan(show: boolean = false, message: string = "Wrong email or password!"): void {

    console.log("Trying to " + (show ? "show" : "hide") + " the span... (old login)");
    return;

    // if (this.submitButton instanceof HTMLElement && this.span instanceof HTMLElement) {
    //   this.span.style.visibility = show ? 'visible' : 'hidden';
    //   //@ts-ignore
    //   this.submitButton.disabled = show;
    //   this.span.innerText = message;
    // }
  }

}
