import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {CommonModule} from "@angular/common";
import {DashboardComponent} from "./Dashboard/dashboard.component";
import {CalendarComponent} from "./Dashboard/Calendar/calendar.component";
import {NavigationComponent} from "./Navigation/navigation.component";
import { SalaryChartComponent } from "./Dashboard/SalaryChart/salary-chart.component";


@NgModule({
  declarations: [HomeComponent, DashboardComponent, CalendarComponent, NavigationComponent, SalaryChartComponent],
  imports:[CommonModule]
})

export class HomeModule{}
