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
      adminFirstName: new FormControl(null, Validators.required),
      adminLastName: new FormControl(null, Validators.required),
      adminEmailAddress: new FormControl(null, [Validators.required, Validators.email]),
      adminPassword1: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      adminPassword2: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

  }

  onSubmit(): void {
    if(!this.registrationForm.invalid){
      let registrationData = this.registrationForm.getRawValue();
      this._dataService.userRegistration(registrationData);
    }
  }

}
