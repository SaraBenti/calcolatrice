import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalcolatriceComponent } from './components/calcolatrice/calcolatrice.component';
import { DisplayComponent } from './components/display/display.component';
import { CalcButtonComponent } from './components/calc-button/calc-button.component';

@NgModule({
  declarations: [
    AppComponent,
    CalcolatriceComponent,
    DisplayComponent,
    CalcButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [DisplayComponent,CalcButtonComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
