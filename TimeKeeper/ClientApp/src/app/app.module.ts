import {BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from "./Home/home.component";
import {LoginComponent} from './Login/login.component';
import {RegisterComponent} from "./Register/register.component";
import {HomeModule} from "./Home/home.module";
import { DashboardComponent } from './Home/Dashboard/dashboard.component';
import { UsersComponent } from './Home/Users/users.component';
import { ErrorMessageComponent } from './Login/ErrorMessage/error-message.component';



@NgModule({

  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ErrorMessageComponent
  ],

  imports: [
    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HomeModule,

    RouterModule.forRoot([
      {
        path: '', component: HomeComponent, children: [
          { path: '', component: DashboardComponent },
          { path: 'Users', component: UsersComponent }
        ]
      },
      { path: 'Login', component: LoginComponent },
      { path: 'Register', component: RegisterComponent }
    ])
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
