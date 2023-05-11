import { Component } from '@angular/core';
import { DisplayComponent } from '../display/display.component';
import { CalcButtonComponent } from '../calc-button/calc-button.component';

@Component({
  selector: 'app-calcolatrice',
  templateUrl: './calcolatrice.component.html',
  styleUrls: ['./calcolatrice.component.css']
})
export class CalcolatriceComponent {
  

constructor(public displayComponent: DisplayComponent,
            public calcButtonComponent:CalcButtonComponent){
 
}
  

}


