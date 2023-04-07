import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { HeaderModule } from '../Header/header.module';
import { AllUsersTableComponent } from './AllUsersTable/all-users-table.component';
import { UserEditingModalComponent } from './AllUsersTable/UserEditingModal/user-editing-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardModule } from '../Dashboard/dashboard.module';
import { UserTimeKeeperModalComponent } from './AllUsersTable/UserTimeKeeperModal/user-time-keeper-modal.component';
import { AllUsersStatisticsComponent } from './AllUsersStatistics/all-users-statistics.component';
import { UserAddingModalComponent } from './AllUsersStatistics/UserAddingModal/user-adding-modal.component';


@NgModule({
  declarations: [UsersComponent, AllUsersTableComponent, UserEditingModalComponent, UserAddingModalComponent, UserTimeKeeperModalComponent, AllUsersStatisticsComponent],
  imports: [CommonModule, HeaderModule, ReactiveFormsModule, FormsModule, DashboardModule]
})
export class UsersModule { }
