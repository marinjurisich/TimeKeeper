import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  isUsersListLoaded: boolean = false;

  users: any[] = [
    {
      firstName: "Name_A",
      lastName: "Surname_A",
      emailAddress: "a@gmail.com",
      password: "pass1",
      isAdmin: false,
      payPerHour: "10"
    },
    {
      firstName: "Name_B",
      lastName: "Surname_B",
      emailAddress: "b@gmail.com",
      password: "pass2",
      isAdmin: true,
      payPerHour: "2"
    },
    {
      firstName: "Name_C",
      lastName: "Surname_C",
      emailAddress: "c@gmail.com",
      password: "pass3",
      isAdmin: false,
      payPerHour: "7"
    }
  ];

  constructor() { }

  ngOnInit(): void {
    console.log("USERS COMPONENT INITIALIZATION");

    this.isUsersListLoaded = false;

    //When data fetched - this block goes in subscribe
    if (this.users.length > 0) {
      this.isUsersListLoaded = true;
    }
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }
}
