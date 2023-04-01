import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { ClientAppRoutes } from '../Shared/Routes/ClientAppRoutes';
import { DataService } from '../Shared/Server/DataService';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registrationForm: any = null;

  readonly clientAppRoutes: ClientAppRoutes;
  submitButton: HTMLElement | null = null;

  constructor(private _dataService: DataService, private _router: Router) {
    this.clientAppRoutes = new ClientAppRoutes(this._router);
  }

  ngOnInit(): void {

    this.registrationForm = new FormGroup({
      companyName: new FormControl(null, Validators.required),
      companyAddress: new FormControl(null, Validators.required),
      adminFirstName: new FormControl(null, Validators.required),
      adminLastName: new FormControl(null, Validators.required),
      adminEmailAddress: new FormControl(null, [Validators.required, Validators.email]),
      adminPassword1: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      adminPassword2: new FormControl(null, [Validators.required, Validators.minLength(6)])
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
