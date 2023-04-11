import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../../Shared/Server/DataService';

@Component({
  selector: 'app-all-users-table',
  templateUrl: './all-users-table.component.html',
  styleUrls: ['./all-users-table.component.scss']
})
export class AllUsersTableComponent implements OnInit {

  @Input() users: any[] = [];
  @Input() filteredUsers: any[] = [];

  currentlyEditingUser: any = null;
  clicksCounterInModal: number = 0;

  private search_by_name_input: any = null;

  constructor(private _dataService: DataService) { }

  ngOnInit(): void {

    //Set max table height
    calculateMyCSSVariables();
    window.onresize = () => { calculateMyCSSVariables(); }

    //Filtering by name
    this.search_by_name_input = document.getElementById("search_by_name_input");
    //@ts-ignore
    search_by_name_input.onkeyup = () => this.filterUsersbyName(this.search_by_name_input.value);

    function calculateMyCSSVariables() { document.documentElement.style.setProperty('--max-table-height', `${window.innerHeight * 0.5}px`); }
  }


  private loadFilteredUsers(): void {
    this.filteredUsers = [];
    this.users.forEach((element: any, index: any) => this.filteredUsers.push(element));
  }
  private filterUsersbyName(searchQuery: any) {
    this.filteredUsers = [];
    this.users.forEach((element: any, index: any) => { if (((element.firstName + " " + element.lastName).toLowerCase()).includes(searchQuery.toLowerCase())) { this.filteredUsers.push(element); }});
  }
  setCurrentlyEditingUser(event: any, user: any): void { this.setDefaultFormValuesForEditing(this.currentlyEditingUser = user) }
  increaseClicksCounter(event: any): void {
    this.clicksCounterInModal++;
    if (this.clicksCounterInModal >= 2) {
      this.clicksCounterInModal = 1;
    }

  }


  //Sorting by firstname + lastname ASCENDING
 sortingUsers_ASC(propertyName: string): void {

   if (propertyName == "Name") {
     //FIRSTNAME & LASTNAME
     this.users.sort(function (a, b) {
       let x = a.firstName + " " + a.lastName;
       let y = b.firstName + " " + b.lastName;

       if (x < y) { return -1; } else if (x > y) { return 1; } else { return 0; }
     });
   } else if (propertyName == "Email") {
     //EMAIL
     this.users.sort(function (a, b) {
       let x = a.emailAddress;
       let y = b.emailAddress;

       if (x < y) { return -1; } else if (x > y) { return 1; } else { return 0; }
     });
   } else if (propertyName == "PayPerHour") {
     //PAY PER HOUR
     this.users.sort(function (a, b) {
       let x = parseFloat(a.payPerHour);
       let y = parseFloat(b.payPerHour);

       if (x < y) { return -1; } else if (x > y) { return 1; } { return 0; }
     });
   }
   this.loadFilteredUsers();
  }
  //Sorting by firstname + lastname DESCENDING
  sortingUsers_DESC(propertyName: string): void {
    if (propertyName == "Name") {
      //FIRSTNAME & LASTNAME
      this.users.sort(function (a, b) {
        let x = a.firstName + " " + a.lastName;
        let y = b.firstName + " " + b.lastName;

        if (x > y) { return -1; } else if (x < y) { return 1; } else { return 0; }
      });
    } else if (propertyName == "Email") {
      //EMAIL
      this.users.sort(function (a, b) {
        let x = a.emailAddress;
        let y = b.emailAddress;

        if (x > y) { return -1; } else if (x < y) { return 1; } else { return 0; }
      });
    } else if (propertyName == "PayPerHour") {
      //PAY PER HOUR
      this.users.sort(function (a, b) {
        let x = parseFloat(a.payPerHour);
        let y = parseFloat(b.payPerHour);

        if (x > y) { return -1; } else if (x < y) { return 1; } else { return 0; }
      });
    }
   this.loadFilteredUsers();
  }



  //When modal send user to delete
  deleteUser(user: any): void {

    //Here goes API for deleting user from database
    this._dataService.deleteUser(Number(user.id)).then((res) => {

      if (res == "OK") {

        //Remove user from array of users
        if (this.users.indexOf(user) > -1) { this.users.splice(this.users.indexOf(user), 1); }

        console.log("\nUSER DELETED: ")
        console.dir(user);
        console.log("\n");

        //@ts-ignore
        this.filterUsersbyName(document.getElementById("search_by_name_input").value);
      }
    });
  }

  //When modal send user to edit
  editUser(user: any): void {

    let propertiesToUpdate = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.emailAddress,
      password: user.password,
      isAdmin: user.isAdmin,
      payPerHour: user.payPerHour,
      companyId: user.companyId,
      grade: user.grade,
      guid: user.guid
    }

    this._dataService.updateUser(propertiesToUpdate).then((res) => {
      if (res == "OK") {

        //Refresh users list
        let thisUserIndex = this.users.indexOf(user);
        if (thisUserIndex > -1) {
          this.users[thisUserIndex] = user;
        }

        console.log("\nUSER UPDATED: ")
        console.dir(user);
        console.log("\n");

        //@ts-ignore
        this.filterUsersbyName(document.getElementById("search_by_name_input").value);
      }
    });
  }



  private setDefaultFormValuesForEditing(user: any): void {
    //@ts-ignore
    document.getElementById("first_name").value = user.firstName;
    //@ts-ignore
    document.getElementById("last_name").value = user.lastName;
    //@ts-ignore
    document.getElementById("email_address").value = user.emailAddress;
    //@ts-ignore
    document.getElementById("pay_per_hour").value = user.payPerHour;
    //@ts-ignore
    document.getElementById("is_admin_checkbox").checked = user.isAdmin;
  }
}
