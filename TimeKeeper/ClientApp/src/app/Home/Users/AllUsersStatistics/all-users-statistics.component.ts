import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-all-users-statistics',
  templateUrl: './all-users-statistics.component.html',
  styleUrls: ['./all-users-statistics.component.scss']
})
export class AllUsersStatisticsComponent implements OnInit {

  @Input() totalNumberOfEmployees: number = 0;
  @Input() totalPayPerHour: number = 0;
  @Input() averagePayPerHour: number = 0;

  @Output() emitRefreshingUsersFlag = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  passEmit(data: number) {
    this.emitRefreshingUsersFlag.emit(data);
  }
}
