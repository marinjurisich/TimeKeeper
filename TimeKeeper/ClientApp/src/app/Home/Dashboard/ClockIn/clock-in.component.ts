import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock-in',
  templateUrl: './clock-in.component.html',
  styleUrls: ['./clock-in.component.scss']
})
export class ClockInComponent implements OnInit {

  clocked_in: boolean = false

  clock_in_arr: any[]


  constructor() {
    this.clock_in_arr = []

    // For demo, put curr time
    this.clock_in();
  }

  ngOnInit(): void {
  }

  clock_out() {
    if (this.clocked_in != true) {
      console.log("Cannot clock out.");
      return;
    }

    let curr_time = new Date();
    let time = curr_time.getHours() + ":" + ("0" + curr_time.getMinutes()).slice(-2);

    this.clock_in_arr.push({
      type: "clock_out",
      time: time
    });
    this.clocked_in = false;

    // On clock out, open workday modal
    let fp_input: any = document.getElementById("fpWorkday");
    fp_input.open_modal_day(curr_time);
  }

  clock_in() {
    if (this.clocked_in == true) {
      console.log("Cannot clock in.");
      return;
    }

    let curr_time = new Date();
    let time = curr_time.getHours() + ":" + ("0" + curr_time.getMinutes()).slice(-2);

    this.clock_in_arr.push({
      type: "clock_in",
      time: time
    });
    this.clocked_in = true;
  }

}
