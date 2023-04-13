import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { FlatpickrModule } from 'angularx-flatpickr';

import { AppComponent } from './app.component';
import { FpComponentComponent } from './app/fp-component/fp-component.component';

@NgModule({
  declarations: [
    AppComponent,
    FpComponentComponent
  ],
  imports: [
    BrowserModule,
    FlatpickrModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
