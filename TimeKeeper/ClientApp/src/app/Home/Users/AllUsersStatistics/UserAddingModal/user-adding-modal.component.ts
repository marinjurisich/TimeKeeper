import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientAppRoutes } from '../../../../Shared/Routes/ClientAppRoutes';
import { DataService } from '../../../../Shared/Server/DataService';
import { Storage } from 'src/app/Shared/Misc/Storage';
import { User } from '../../../../Shared/Models/User';

@Component({
  selector: 'app-user-adding-modal',
  templateUrl: './user-adding-modal.component.html',
  styleUrls: ['./user-adding-modal.component.scss']
})
export class UserAddingModalComponent implements OnInit {

  @Output() emitRefreshingUsersFlag = new EventEmitter<number>();

  clientAppRoutes: ClientAppRoutes;
  addNewUserForm: any = null;

  constructor(private _router: Router, private _dataService: DataService) {
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

    let loggedUser = Storage.getUser();
    if (!loggedUser) {
      this.clientAppRoutes.navigateToLogin();
    }

    if (!this.addNewUserForm.invalid && password1 == password2 && loggedUser) {

      let newUserData = this.addNewUserForm.getRawValue();

      let userDataToSend = {
        firstName: newUserData.userFirstName,
        lastName: newUserData.userLastName,
        email: newUserData.userEmailAddress,
        password: newUserData.userPassword1,
        isAdmin: checkbox,
        payPerHour: parseFloat(newUserData.userPayPerHour),
       
        //Data from logged user (ADMIN)A
        companyId: loggedUser.companyId,
        grade: loggedUser.grade
      }

      // Here goes API for saving user in database
      this._dataService.userRegistrationModal(userDataToSend).then(res => {
        if (res == "OK") {
          console.log("\nNEW USER CREATED: ")
          console.dir(userDataToSend);
          console.log("\n");
          this.emitRefreshingUsersFlag.emit(1);
          //this.refreshThisURLComponent();
        } else {
          console.log("FAILED TO CREATE NEW USER")
        }
      });
    }
  }

  private async refreshThisURLComponent() {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.clientAppRoutes.navigateToUsers();
    });
  }
}
