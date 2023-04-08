import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientAppRoutes } from '../../../../Shared/Routes/ClientAppRoutes';

@Component({
  selector: 'app-user-adding-modal',
  templateUrl: './user-adding-modal.component.html',
  styleUrls: ['./user-adding-modal.component.scss']
})
export class UserAddingModalComponent implements OnInit {

  clientAppRoutes: ClientAppRoutes;
  addNewUserForm: any = null;

  constructor(private _router: Router) {
    this.clientAppRoutes = new ClientAppRoutes(this._router);
  }

  ngOnInit(): void {

    this.addNewUserForm = new FormGroup({
      userFirstName: new FormControl(null, Validators.required),
      userLastName: new FormControl(null, Validators.required),
      userEmailAddress: new FormControl(null, [Validators.required, Validators.email]),
      userPayPerHour: new FormControl(null, [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]),
      userPassword1: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      userPassword2: new FormControl(null, [Validators.required, Validators.minLength(2)])
    });

  }

  savingDone(event: any): void {

    let password1 = this.addNewUserForm.controls['userPassword1'].value;
    let password2 = this.addNewUserForm.controls['userPassword2'].value;

    //@ts-ignore
    let checkbox = document.getElementById("is_admin_checkbox_adding_user").checked;

    if (!this.addNewUserForm.invalid && password1 == password2) {
      let newUserData = this.addNewUserForm.getRawValue();
      newUserData.isAdmin = checkbox;

      // Here goes API for saving user in database

      console.log("\nNEW USER CREATED: ")
      console.dir(newUserData);
      console.log("\n");
      this.refreshThisURLComponent();
    }
  }

  private async refreshThisURLComponent() {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.clientAppRoutes.navigateToUsers();
    });
  }
}
