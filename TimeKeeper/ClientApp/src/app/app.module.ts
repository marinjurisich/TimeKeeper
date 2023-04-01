import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/login.component';
import { RegisterComponent } from "./Register/register.component";
import { RouterModule } from '@angular/router';
import { HomeComponent } from './Home/home.component';
import { DashboardComponent } from './Home/Dashboard/dashboard.component';
import { UsersComponent } from './Home/Users/users.component';
import { HomeModule } from './Home/home.module';


@NgModule({

  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],

  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
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
    ]),


  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
