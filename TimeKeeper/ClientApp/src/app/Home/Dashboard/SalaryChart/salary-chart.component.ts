import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-salary-chart',
  templateUrl: './salary-chart.component.html',
  styleUrls: ['./salary-chart.component.scss']
})
export class SalaryChartComponent implements OnInit {

  public chart: any;

  chartData: any = {
    "labels": [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "BANANA"
    ],
    "datasets": [
      {
        "label": "Earnings",
        "fill": true,
        "data": [
          "0",
          "10000",
          "5000",
          "15000",
          "10000",
          "20000",
          "15000",
          "25000",
          "5000"
        ],
        "backgroundColor": "rgba(78, 115, 223, 0.05)",
        "borderColor": "rgba(78, 115, 223, 1)"
      }
    ]
  }

  constructor() { }

  ngOnInit(): void {
    this.createLineChart()
  }

  calculateMonths(dataLength: number): any {

    var date = new Date();

    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    var monthsInOrder = [];

    var m = date.getMonth();
    var i = dataLength;
    while (i > 0) {
      var index = m;
      if (index < 0) {
        index = index + 12;
      }
      monthsInOrder.push(months[index]);
      m--;
      i--;
    }

    monthsInOrder = monthsInOrder.reverse();

    return monthsInOrder;
  }



  async createLineChart() {

    //get months data
    let userId = JSON.parse(sessionStorage.user_session).id;
    let url = environment.API_URL + "/Month/GetLastTwelveMonths?userId=" + userId;
    let data = await fetch(url).then(r => r.json()).then((data) => { return data });
    //data = data.reverse();

    let salaries = [];

    for (var d of data) {
      salaries.push(d.salary.toFixed(2).toString());
    }

    //input salaries into the graph
    this.chartData.datasets[0].data = salaries;
    //show only existing months from last 12 months
    this.chartData.labels = this.calculateMonths(data.length);


    this.chart = new Chart("workDataChart", {

      // Chart type
      type: "line",

      // Chart data
      data: this.chartData,

      // Chart options
      options: {
        responsive: true,
        maintainAspectRatio: false,
        // animation: false,
      }
    });
  }

  async exportGraph() {

    var id = JSON.parse(sessionStorage.user_session).id;
    let url = environment.API_URL + "/Month/Export?userId=" + id;
    window.open(url,"_blank");

  }

  // We can use this chart (for now it contains dummy data)
  createBarChart(){
  
    //this.chart = new Chart("workDataChart", {
    //  type: 'bar', //this denotes tha type of chart

    //  data: {// values on X-Axis
    //    labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
				//				 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	   //    datasets: [
    //      {
    //        label: "Sales",
    //        data: ['467','576', '572', '79', '92',
				//				 '574', '573', '576'],
    //        backgroundColor: 'blue'
    //      },
    //      {
    //        label: "Profit",
    //        data: ['542', '542', '536', '327', '17',
				//					 '0.00', '538', '541'],
    //        backgroundColor: 'limegreen'
    //      }  
    //    ]
    //  },
    //  options: {
    //    aspectRatio:2.5
    //  }
    //});
  }


}
