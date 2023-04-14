import { Component, OnInit } from '@angular/core';
import { User } from '../../Shared/Models/User';
import { Storage } from 'src/app/Shared/Misc/Storage';
import { DataService } from '../../Shared/Server/DataService';
import { ClientAppRoutes } from '../../Shared/Routes/ClientAppRoutes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  loggedUser: User | null;

  users: any[] = [];
  filteredUsers: any = [];

  totalNumberOfEmployees: number = 0;
  totalPayPerHour: number = 0;
  averagePayPerHour: number = 0;

  readonly clientAppRoutes: ClientAppRoutes;

  constructor(private _router: Router, private _dataService: DataService) {

    this.clientAppRoutes = new ClientAppRoutes(this._router);
    // Get logged in user
    this.loggedUser = Storage.getUser();
    if (!this.loggedUser) {
      this.clientAppRoutes.Logout();
    } else {
      if (!this.loggedUser.isAdmin) {
        this.clientAppRoutes.navigateToDashboard();
      }
    }
  }

  ngOnInit(): void {
    console.log("USERS COMPONENT INITIALIZATION");

    this.loadList();
  }

  listenForRefreshingUsersEmitter(data: number): void {
    if (data == 1) { this.loadList(); }
  }

  private loadList(): void {
    if (this.loggedUser) {
      /*FETCH DATA*/
      this._dataService.listUsers(Number(this.loggedUser.companyId)).then(res => {

        this.users = [];
        this.filteredUsers = [];

        //@ts-ignore
        if (res?.length > 0) {

          res?.forEach((element: any, index: any) => {
            this.users.push(element);
            this.filteredUsers.push(element);
          });

          console.dir(this.users);
      
          this.totalNumberOfEmployees = this.users.length;
          this.totalPayPerHour = this.calculateTotalPayPerHour(this.users);
          this.averagePayPerHour = this.calculateAveragePayPerHour(this.users);
        }
      });
    }
  }

  scrollToTop(): void {
    window.scrollTo(0, 0);
  }


  private calculateTotalPayPerHour(users: any): any {
    let sumPayPerHour = 0;
    users.forEach((element: any, index: any) => sumPayPerHour += parseFloat(element.payPerHour));
    return sumPayPerHour.toFixed(2);
  }

  private calculateAveragePayPerHour(users: any): any {
    return (this.calculateTotalPayPerHour(users) / users.length).toFixed(2);
  }
}
