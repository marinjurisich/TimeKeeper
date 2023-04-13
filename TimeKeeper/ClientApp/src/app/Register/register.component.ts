import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DataService } from "../Shared/Server/DataService";
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


  // Routing utility
  clientAppRoutes: ClientAppRoutes;


  // User form
  registerUserForm: FormGroup;

  // UI helpers
  errorMessage: string = "";
  registerFinished: boolean = true;
  register_disabled: boolean = true;

  constructor(private _dataService: DataService, private _router: Router) {

    this.clientAppRoutes = new ClientAppRoutes(this._router);

    this.registerUserForm = new FormGroup({

      // Company data
      name: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),

      // User data
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required),

      // Company ID field is hidden and is added through JS
      //companyId: new FormControl(1, Validators.required), // Hardcoded to 1 for now
      isAdmin: new FormControl(true, Validators.required),
      payPerHour: new FormControl(10, Validators.required),
    });

    // Listen for form changes
    this.registerUserForm.valueChanges.subscribe(data => {

      // Check validity on form input
      let form_valid = this.registerUserForm.invalid;
      let passwords_differ = data["password"] !== data["confirmPassword"];

      // Update boolean
      this.register_disabled = this.registerUserForm.invalid || passwords_differ;
    });

  }


  ngOnInit(): void {
    this.showErrorMessage(null);
  }

  private showErrorMessage(message: string | null): void {
    // _no_err_ is trigger for making the error transparent
    console.log(`Setting error: "${message}"`)
    this.errorMessage = message || "_no_err_";
  }

  onSubmit(): void {

    if (confirm(
      "[TESTING]   Is this data ok:\n\n" +
      JSON.stringify(
        this.registerUserForm.getRawValue(), null, 2
      )
    )
      && !this.registerUserForm.invalid
    ) {

      this.registerFinished = false;
      this.showErrorMessage(null);
      let form_data = this.registerUserForm.getRawValue();

      let data = {
        name: form_data.name,
        address: form_data.address,
        firstName: form_data.firstName,
        lastName: form_data.lastName,
        email: form_data.email,
        password: form_data.password,
        isAdmin: form_data.isAdmin,
        payPerHour: form_data.payPerHour
      }

      this._dataService.userRegistration(data)
        .then(success => {
          if (success) {
            this.showErrorMessage(null);
            this.clientAppRoutes.navigateToDashboard();
          }
          else {
            this.showErrorMessage("Unsucessful registration!");
          }
        })
        .finally(() => {
          this.registerFinished = true;
        });
    }

  }

}
