import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ClockInItem } from 'src/app/Shared/Models/ClockInItem';

@Component({
  selector: 'app-clock-in',
  templateUrl: './clock-in.component.html',
  styleUrls: ['./clock-in.component.scss']
})
export class ClockInComponent implements OnInit {

  clocked_in: boolean = false;

  @Input() clock_ins_today!: ClockInItem[];
  @Output() clock_ins_todayChange = new EventEmitter<ClockInItem>()


  constructor() {
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

    this.clock_ins_todayChange.emit(new ClockInItem("clock_out", new Date(curr_time)));
    this.clocked_in = false;

    // On clock out, open workday modal
    let fp_input: any = document.getElementById("fpWorkday");
    fp_input.open_modal_day(curr_time);

    // Emit change to parent component
  }

  clock_in() {
    if (this.clocked_in == true) {
      console.log("Cannot clock in.");
      return;
    }

    let curr_time = new Date();
    let time = curr_time.getHours() + ":" + ("0" + curr_time.getMinutes()).slice(-2);

    this.clock_ins_todayChange.emit(new ClockInItem("clock_in", new Date(curr_time)));
    this.clocked_in = true;
  }

  // Take only clock ins and outs that happened today
  filter_today(clock_ins: ClockInItem[]): ClockInItem[] {

    let today_iso = new Date().toISOString().substring(0, 10);
    let filtered = clock_ins.filter(ci => {
      return ci.getDate() == today_iso;
    });
    return filtered;
  }

}
