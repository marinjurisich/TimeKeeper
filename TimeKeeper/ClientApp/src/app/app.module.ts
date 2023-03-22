import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './home/Dashboard/dashboard.component';
import {NavigationComponent} from './home/Navigation/navigation.component';
import {LoginComponent} from './Login/login.component';
import {RegisterComponent} from "./Register/register.component";


@NgModule({

  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NavigationComponent
  ],

  imports: [

    BrowserModule.withServerTransition({appId: 'ng-cli-universal'}),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent, pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent}
    ])

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
