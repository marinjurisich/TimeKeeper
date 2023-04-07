import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-all-users-table',
  templateUrl: './all-users-table.component.html',
  styleUrls: ['./all-users-table.component.scss']
})
export class AllUsersTableComponent implements OnInit {

  @Input() users: any[] = [];
  @Input() isUsersListLoaded: boolean = false;

  filteredUsers: any[] = [];
  currentlyEditingUser: any = null;

  public static adminViewingSelectedUser: any = null;

  private search_by_name_input: any = null;

  constructor() { }

  ngOnInit(): void {

    //Set max table height
    calculateMyCSSVariables();
    window.onresize = () => { calculateMyCSSVariables(); }

    // Checking if done loading users in parent component
    let myInterval: any = setInterval(() => {
      console.log("Checking for users to display in table");

      if (this.isUsersListLoaded) {
        clearInterval(myInterval);
        console.log("Fetched list of users and it is displaying in table");
         //On init filtered users are equal to all users
        this.loadFilteredUsers();
      }
    }, 500);
  
 
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
  setCurrentlyEditingUser(event: any, user: any): void { this.setDefaultFormValues(this.currentlyEditingUser = user); }



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
  deleteUser(event: any): void {

    //Remove user from array of users
    if (this.users.indexOf(event) > -1) { this.users.splice(this.users.indexOf(event), 1); }

    //Here goes API for deleting user from database
    // ...
    // ...
    // ...

    console.log("\nUSER DELETED: ")
    console.dir(event);
    console.log("\n");

    //@ts-ignore
    this.filterUsersbyName(document.getElementById("search_by_name_input").value);
  }



  //When TimeKeeper button clicked
  timeKeeperNavigate(event: any, user: any): void {
    AllUsersTableComponent.adminViewingSelectedUser = user;
    console.log("Opening TimeKeeper for user: " + AllUsersTableComponent.adminViewingSelectedUser.firstName);
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
