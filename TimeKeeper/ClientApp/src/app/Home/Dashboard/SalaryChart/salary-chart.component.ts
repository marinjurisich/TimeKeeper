import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-salary-chart',
  templateUrl: './salary-chart.component.html',
  styleUrls: ['./salary-chart.component.scss']
})
export class SalaryChartComponent implements OnInit {

  public chart: any;

  barChartData: any = {
    "labels": [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug"
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
          "25000"
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

  createLineChart(){

    this.chart = new Chart("workDataChart", {

      // Chart type
      type: "line",

      // Chart data
      data: this.barChartData,

      // Chart options
      options: {
        // aspectRatio: 2.5,
        animation: {
            onComplete: function(animation) {
              // Center
              let canvas = document.getElementById("workDataChart");
              if (canvas) {
                canvas.style.margin = "0 auto";
              }
            }
        }
      }
    });
  }

  // We can use this chart (for now it contains dummy data)
  createBarChart(){
  
    this.chart = new Chart("workDataChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
								 '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ], 
	       datasets: [
          {
            label: "Sales",
            data: ['467','576', '572', '79', '92',
								 '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
									 '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }  
        ]
      },
      options: {
        aspectRatio:2.5
      }
    });
  }


}
