import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.setDayOfMonth();
    this.setAnnualEarnings();
    this.setMonthlyEarnings();
  }

  async setMonthlyEarnings() {

    let date = new Date().toISOString();
    let userId = JSON.parse(sessionStorage.user_session).id;
    let url = environment.API_URL + "/Month/Get?userId=" + userId + "&date=" + date;
    let data = await fetch(url).then(r => r.json()).then((data) => { return data });
    console.log("MOTH", data);
    var span: any = document.getElementById("monthlyEarnings");
    span.innerText = data.salary.toFixed(2).toString();

  }

  setDayOfMonth() {

    let day = new Date();
    var span: any = document.getElementById("dayOfMonth");
    span.innerText = day.getDate();

  }

  async setAnnualEarnings() {

    let span: any = document.getElementById("annualEarnings");

    let userId = JSON.parse(sessionStorage.user_session).id;
    let url = environment.API_URL + "/Month/GetThisYear?userId=" + userId;
    let data = await fetch(url).then(r => r.json()).then((data) => { return data });
    
    let earnings: number = 0;
    for (var d of data) {
      earnings += d.salary;
    }

    span.innerText = "$" + earnings.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  }

}
