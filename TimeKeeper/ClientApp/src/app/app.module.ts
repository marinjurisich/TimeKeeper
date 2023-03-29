import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from "./Home/home.component";
import {LoginComponent} from './Login/login.component';
import {RegisterComponent} from "./Register/register.component";
import {HomeModule} from "./Home/home.module";


@NgModule({

  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
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
    ]),
    HomeModule

  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
