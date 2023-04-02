import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../Shared/Server/DataService";
import { ClientAppRoutes } from '../Shared/Routes/ClientAppRoutes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // demoImageCss: string = "url('https://fastly.picsum.photos/id/64/4326/2884.jpg?hmac=9_SzX666YRpR_fOyYStXpfSiJ_edO3ghlSRnH2w09Kg')";
  demoImageCss: string = "url('https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FsZW5kYXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60')";


  registrationForm: any = null;
  clientAppRoutes: ClientAppRoutes;

  constructor(private _dataService: DataService, private _router: Router) {
    this.clientAppRoutes = new ClientAppRoutes(this._router);
  }

  ngOnInit(): void {

    this.registrationForm = new FormGroup({
      companyName: new FormControl(null, Validators.required),
      companyAddress: new FormControl(null, Validators.required),
      userFirstName: new FormControl(null, Validators.required),
      userLastName: new FormControl(null, Validators.required),
      userEmailAddress: new FormControl(null, [Validators.required, Validators.email]),
      userPayPerHour: new FormControl(null, [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]),
      userPassword1: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      userPassword2: new FormControl(null, [Validators.required, Validators.minLength(2)])
    });

  }

  onRegister(event: any): void {
    if (!this.registrationForm.invalid) {

      console.log("Registration form is valid");

      let registrationData = this.registrationForm.getRawValue();
      this._dataService.userRegistration(registrationData);

    } else {
      console.log("Registration form is invalid");
    }
  }

}
