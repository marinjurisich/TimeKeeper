import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-time-keeper-modal',
  templateUrl: './user-time-keeper-modal.component.html',
  styleUrls: ['./user-time-keeper-modal.component.scss']
})
export class UserTimeKeeperModalComponent implements OnInit {

  @Input() receivedUser: any = null;

  constructor() { }

  ngOnInit(): void {
  }

}
