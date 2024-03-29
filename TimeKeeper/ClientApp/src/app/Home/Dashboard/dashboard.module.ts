import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { CalendarComponent } from './Calendar/calendar.component';
import { ClockInComponent } from './ClockIn/clock-in.component';
import { SalaryChartComponent } from './SalaryChart/salary-chart.component';
import { SummaryComponent } from './Summary/summary.component';
import { HeaderModule } from '../Header/header.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';


@NgModule({
  declarations: [
    DashboardComponent,
    CalendarComponent,
    ClockInComponent,
    SalaryChartComponent,
    SummaryComponent
  ],

  imports: [
    CommonModule, HeaderModule, ReactiveFormsModule, FormsModule, FlatpickrModule.forRoot()
  ],

  exports: [
    DashboardComponent,
    CalendarComponent,
    ClockInComponent,
    SalaryChartComponent,
    SummaryComponent
  ]
})
export class DashboardModule { }
