import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock-in',
  templateUrl: './clock-in.component.html',
  styleUrls: ['./clock-in.component.scss']
})
export class ClockInComponent implements OnInit {

  clocked_in: boolean = false;
  clock_in_arr: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.clock_in_arr = [];
  }


  clock_out() {
    let curr_time = new Date();
    let time = curr_time.getHours() + ":" + ("0" + curr_time.getMinutes()).slice(-2);

    this.clock_in_arr.push({
      type: "clock_out",
      time: time
    });
    this.clocked_in = false;
  }


  clock_in() {
    let curr_time = new Date();
    let time = curr_time.getHours() + ":" + ("0" + curr_time.getMinutes()).slice(-2);

    this.clock_in_arr.push({
      type: "clock_in",
      time: time
    });
    this.clocked_in = true;
  }

}
