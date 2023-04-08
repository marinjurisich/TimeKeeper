import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-editing-modal',
  templateUrl: './user-editing-modal.component.html',
  styleUrls: ['./user-editing-modal.component.scss']
})
export class UserEditingModalComponent implements OnInit {

  @Input() receivedUser: any = null;

  @Output() userDeletedEmit = new EventEmitter<any>();
  @Output() userEditedEmit = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void { }

  editingDone(event: any): void {

    let editUserForm = document.getElementById("edit_user_form");

    //@ts-ignore
    if (editUserForm.checkValidity()) {

      //@ts-ignore
      let first_name = document.getElementById("first_name").value;
      //@ts-ignore
      let last_name = document.getElementById("last_name").value;
      //@ts-ignore
      let email_address = document.getElementById("email_address").value;
      //@ts-ignore
      let pay_per_hour = document.getElementById("pay_per_hour").value;
      //@ts-ignore
      let password_1 = document.getElementById("password_1").value;
      //@ts-ignore
      let password_2 = document.getElementById("password_2").value;
      //@ts-ignore
      let isAdminCheck = document.getElementById("is_admin_checkbox").checked;

      if (password_1 == password_2) {

        this.receivedUser.firstName = first_name;
        this.receivedUser.lastName = last_name;
        this.receivedUser.emailAddress = email_address;
        this.receivedUser.password = password_1;
        this.receivedUser.payPerHour = pay_per_hour;
        this.receivedUser.isAdmin = isAdminCheck;
        
        this.userEditedEmit.emit(this.receivedUser);
      }
    }

    this.setDefaultFormValues(this.receivedUser);
  }

  //Emitting user to parent component
  emitUserDeleting(event: any): void {
    this.userDeletedEmit.emit(this.receivedUser);
  }

  private setDefaultFormValues(user: any): void {
    //@ts-ignore
    document.getElementById("first_name").value = user.firstName;
    //@ts-ignore
    document.getElementById("last_name").value = user.lastName;
    //@ts-ignore
    document.getElementById("email_address").value = user.emailAddress;
    //@ts-ignore
    document.getElementById("pay_per_hour").value = user.payPerHour;
    //@ts-ignore
    document.getElementById("password_1").value = user.password;
    //@ts-ignore
    document.getElementById("password_2").value = user.password;
    //@ts-ignore
    document.getElementById("is_admin_checkbox").checked = user.isAdmin;
  }
}
