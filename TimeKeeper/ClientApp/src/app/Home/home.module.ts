import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { HomeComponent } from "./home.component";
import { NavigationComponent } from "./Navigation/navigation.component";
import { RouterModule } from "@angular/router";
import { DashboardModule } from "./Dashboard/dashboard.module";
import { UsersModule } from "./Users/users.module";


@NgModule({
  declarations: [
    HomeComponent,
    NavigationComponent
  ],
  imports: [CommonModule, DashboardModule, UsersModule, RouterModule]
})

export class HomeModule{}
