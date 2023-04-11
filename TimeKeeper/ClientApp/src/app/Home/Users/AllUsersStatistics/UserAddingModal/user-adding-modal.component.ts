import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientAppRoutes } from '../../../../Shared/Routes/ClientAppRoutes';
import { DataService } from '../../../../Shared/Server/DataService';
import { Storage } from 'src/app/Shared/Misc/Storage';

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

    this.setForm();

    let add_new_user = document.getElementById("add_new_user");
    if (add_new_user) { add_new_user.onclick = () => this.setForm(); }
  }



  savingDone(event: any): void {

    let loggedUser = Storage.getUser();
    let newUserData = this.addNewUserForm.getRawValue();

    if (loggedUser) {

      newUserData.companyId = loggedUser.companyId;
      newUserData.grade = loggedUser.grade;

      if (!this.addNewUserForm.invalid && this.addNewUserForm.controls['password'].value == this.addNewUserForm.controls['confirmPassword'].value) {

        /*Convert pay per hour to number*/
        newUserData.payPerHour = parseFloat(newUserData.payPerHour);

        // Here goes API for saving user in database
        this._dataService.userRegistrationModal(newUserData).then(res => {
          if (res == "OK") {
            console.log("\nNEW USER CREATED: ")
            console.dir(newUserData);
            console.log("\n");
            this.emitRefreshingUsersFlag.emit(1);
            //this.refreshThisURLComponent();
          } else {
            console.log("FAILED TO CREATE NEW USER")
          }
        });
      }
    } else {

      this.clientAppRoutes.navigateToLogin();
    }
  }

  private async refreshThisURLComponent() {
    this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.clientAppRoutes.navigateToUsers();
    });
  }


  private setForm(): void {
    this.addNewUserForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      payPerHour: new FormControl(null, [Validators.required, Validators.pattern(/^\d*\.?\d*$/)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      isAdmin: new FormControl(false)
    });
  }
}
