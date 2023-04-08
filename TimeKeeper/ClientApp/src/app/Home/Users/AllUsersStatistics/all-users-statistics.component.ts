import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-users-statistics',
  templateUrl: './all-users-statistics.component.html',
  styleUrls: ['./all-users-statistics.component.scss']
})
export class AllUsersStatisticsComponent implements OnInit {

  @Input() users: any[] = [];
  @Input() isUsersListLoaded: boolean = false;

  totalNumberOfEmployees: number = 0;
  totalPayPerHour: number = 0;
  averagePayPerHour: number = 0;

  constructor() { }

  ngOnInit(): void {

    // Checking if done loading users in parent component
    let myInterval: any = setInterval(() => {
      if (this.isUsersListLoaded) {
        clearInterval(myInterval);
        this.totalNumberOfEmployees = this.users.length;
        this.totalPayPerHour = this.calculateTotalPayPerHour(this.users);
        this.averagePayPerHour = this.calculateAveragePayPerHour(this.users);
      }
    }, 500);

  }

  private calculateTotalPayPerHour(users:any): any {
    let sumPayPerHour = 0;
    users.forEach((element: any, index: any) => sumPayPerHour += parseFloat(element.payPerHour));
    return sumPayPerHour;
  }

  private calculateAveragePayPerHour(users: any): any {
    return (this.calculateTotalPayPerHour(users) / users.length).toFixed(2);
  }

}
