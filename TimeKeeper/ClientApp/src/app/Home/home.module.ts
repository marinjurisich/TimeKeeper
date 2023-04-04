import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { CommonModule } from "@angular/common";
import { NavigationComponent } from "./Navigation/navigation.component";
import { DashboardModule } from "./Dashboard/dashboard.module";
import { UsersModule } from "./Users/users.module";
import { RouterModule } from "@angular/router";



@NgModule({
  declarations: [
    HomeComponent,
    NavigationComponent
  ],
  imports: [CommonModule, DashboardModule, UsersModule, RouterModule]
})

export class HomeModule { }
