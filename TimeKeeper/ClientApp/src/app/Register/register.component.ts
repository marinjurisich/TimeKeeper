import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../Shared/Server/DataService";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: any = null;

  constructor(private _dataService: DataService) {
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
