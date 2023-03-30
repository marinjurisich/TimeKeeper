import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {CommonModule} from "@angular/common";
import {DashboardComponent} from "./Dashboard/dashboard.component";
import {CalendarComponent} from "./Dashboard/Calendar/calendar.component";
import {NavigationComponent} from "./Navigation/navigation.component";
import {SalaryChartComponent} from "./Dashboard/SalaryChart/salary-chart.component";
import { ClockInComponent } from './Dashboard/ClockIn/clock-in.component';
import { SummaryComponent } from './Dashboard/Summary/summary.component';


@NgModule({
  declarations: [HomeComponent, DashboardComponent, CalendarComponent, NavigationComponent, SalaryChartComponent, ClockInComponent, SummaryComponent],
  imports:[
    CommonModule,
  ]
})

export class HomeModule{}
