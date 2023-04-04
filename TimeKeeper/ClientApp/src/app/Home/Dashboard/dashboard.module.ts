import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { CalendarComponent } from './Calendar/calendar.component';
import { ClockInComponent } from './ClockIn/clock-in.component';
import { SalaryChartComponent } from './SalaryChart/salary-chart.component';
import { SummaryComponent } from './Summary/summary.component';
import { HeaderModule } from '../Header/header.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    CalendarComponent,
    ClockInComponent,
    SalaryChartComponent,
    SummaryComponent],

  imports: [
    CommonModule, HeaderModule, ReactiveFormsModule
  ]
})
export class DashboardModule { }
