import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { CalendarComponent } from './Calendar/calendar.component';
import { ClockInComponent } from './ClockIn/clock-in.component';
import { SalaryChartComponent } from './SalaryChart/salary-chart.component';
import { SummaryComponent } from './Summary/summary.component';



@NgModule({
  declarations: [
    DashboardComponent,
    CalendarComponent,
    ClockInComponent,
    SalaryChartComponent,
    SummaryComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
