import { Component, OnInit } from '@angular/core';
declare let google: any;

@Component({
  selector: 'app-salary-chart',
  templateUrl: './salary-chart.component.html',
  styleUrls: ['./salary-chart.component.scss']
})
export class SalaryChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    loadChart();

    function loadChart() {

      google.charts.load('current', { packages: ['corechart'] });
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        // Set Data
        var data = google.visualization.arrayToDataTable([
          ['Price', 'Size'],
          ['Jan', 7], ['Feb', 8], ['Mar', 8], [80, 9], [90, 9],
          [100, 9], [110, 10], [120, 11],
          [130, 14], [140, 14], [150, 15]
        ]);

        // Set Options
        var options = {
          title: 'House Prices vs. Size',
          hAxis: { title: 'Square Meters' },
          vAxis: { title: 'Price in Millions' },
          legend: 'none'
        };

        // Draw
        var chart = new google.visualization.LineChart(document.getElementById('myChart'));
        chart.draw(data, options);
      }
    }
  }

}
