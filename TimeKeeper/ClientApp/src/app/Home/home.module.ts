imports: [CommonModule, DashboardModule, UsersModule, RouterModule]
import {SalaryChartComponent} from "./Dashboard/SalaryChart/salary-chart.component";
import { ClockInComponent } from './Dashboard/ClockIn/clock-in.component';
import { SummaryComponent } from './Dashboard/Summary/summary.component';
import { HeaderComponent } from './Header/header.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {NgModule} from "@angular/core";
import {HomeComponent} from "./home.component";
import {CommonModule} from "@angular/common";
import {NavigationComponent} from "./Navigation/navigation.component";
import { DashboardModule } from "./Dashboard/dashboard.module";
import { UsersModule } from "./Users/users.module";
import { RouterModule } from "@angular/router";


@NgModule({
  declarations: [HomeComponent, DashboardComponent, CalendarComponent, NavigationComponent, SalaryChartComponent, ClockInComponent, SummaryComponent, HeaderComponent],
  imports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeComponent,
    NavigationComponent
  ]
})

export class HomeModule{}
