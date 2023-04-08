import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loggedUser: any = {
    firstName: "Name_A",
    lastName: "Surname_A"
  }

  constructor() { }

  ngOnInit(): void {
  }

}
