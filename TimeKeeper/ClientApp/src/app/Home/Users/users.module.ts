import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { HeaderModule } from '../Header/header.module';


@NgModule({
  declarations: [ UsersComponent ],
  imports: [ CommonModule, HeaderModule ]
})
export class UsersModule { }
