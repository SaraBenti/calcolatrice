import { Component } from '@angular/core';
import { DisplayComponent } from '../display/display.component';

@Component({
  selector: 'app-calc-button',
  templateUrl: './calc-button.component.html',
  styleUrls: ['./calc-button.component.css']
})
export class CalcButtonComponent {
operando1:number=0;
operando2:number=0;
operatore:string="";
setOperatore=false;
daCalcolare="";
result=false;

constructor(public displayComponent: DisplayComponent){
 
}

pressButton(but: string) {
  if (but === '/' || but === '*' || but === '-' || but === '+') {
    const lastBut = this.displayComponent.testoDisplay[this.displayComponent.testoDisplay.length - 1];
    console.log(lastBut);
    if (lastBut === '/' || lastBut === '*' || lastBut === '-' || lastBut === '+')  {
      this.setOperatore = true;
    }
    if ((this.setOperatore) || (this.displayComponent.testoDisplay === '')) {
      return;
    }
    this.operando1 = parseFloat(this.displayComponent.testoDisplay);
    this.operatore = but;
    this.setOperatore = true;
 }
 if (this.displayComponent.testoDisplay.length === 10) {
   return;
 }
 this.displayComponent.testoDisplay += but;
}
getResult() {
  this.daCalcolare = this.displayComponent.testoDisplay;
  this.operando2 = parseFloat(this.displayComponent.testoDisplay.split(this.operatore)[1]);
  if (this.operatore === '/') {
  
    this.displayComponent.testoDisplay = (this.operando1 / this.operando2).toString();
    if (this.displayComponent.testoDisplay.length > 9) {
      this.displayComponent.testoDisplay = this.displayComponent.testoDisplay.substring(0, 9);
    }
  } else if (this.operatore === '*') {
   
    this.displayComponent.testoDisplay = (this.operando1 * this.operando2).toString();

    if (this.displayComponent.testoDisplay.length > 9) {
      this.displayComponent.testoDisplay = 'ERROR';
    
    }
  } else if (this.operatore === '-') {
   
    this.displayComponent.testoDisplay = (this.operando1 - this.operando2).toString();
  
  } else if (this.operatore === '+') {
   
    this.displayComponent.testoDisplay = (this.operando1 + this.operando2).toString();
  
    if (this.displayComponent.testoDisplay.length > 9) {
      this.displayComponent.testoDisplay = 'ERROR';
    
    }
  } else {
    this.displayComponent.testoDisplay = 'ERROR: Invalid Operation';
  }
  this.result = true;
}
 
getReset(){
  this.displayComponent.testoDisplay = '';

  this.setOperatore = false;
}

typeOfButton(but:string){
  switch(but){
    case ('AC'):
      this.getReset();
      break;
      case('='):
      this.getResult();
      break;
      default:
        this.pressButton(but);
        break;
  }
}

}
