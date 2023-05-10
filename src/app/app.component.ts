import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'calcolatrice';
  testoDisplay:string="";
  
  operando1:number=0;
  operando2:number=0;
  operatore:string="";
setOperatore=false;
daCalcolare="";
result=false;


  pressButton(but: string) {
    if (but === '/' || but === '*' || but === '-' || but === '+') {
      const lastBut = this.testoDisplay[this.testoDisplay.length - 1];
      console.log(lastBut);
      if (lastBut === '/' || lastBut === '*' || lastBut === '-' || lastBut === '+')  {
        this.setOperatore = true;
      }
      if ((this.setOperatore) || (this.testoDisplay === '')) {
        return;
      }
      this.operando1 = parseFloat(this.testoDisplay);
      this.operatore = but;
      this.setOperatore = true;
   }
   if (this.testoDisplay.length === 10) {
     return;
   }
   this.testoDisplay += but;
}
getResult() {
  this.daCalcolare = this.testoDisplay;
  this.operando2 = parseFloat(this.testoDisplay.split(this.operatore)[1]);
  if (this.operatore === '/') {
  
    this.testoDisplay = (this.operando1 / this.operando2).toString();
    if (this.testoDisplay.length > 9) {
      this.testoDisplay = this.testoDisplay.substring(0, 9);
    }
  } else if (this.operatore === '*') {
   
    this.testoDisplay = (this.operando1 * this.operando2).toString();

    if (this.testoDisplay.length > 9) {
      this.testoDisplay = 'ERROR';
    
    }
  } else if (this.operatore === '-') {
   
    this.testoDisplay = (this.operando1 - this.operando2).toString();
  
  } else if (this.operatore === '+') {
   
    this.testoDisplay = (this.operando1 + this.operando2).toString();
  
    if (this.testoDisplay.length > 9) {
      this.testoDisplay = 'ERROR';
    
    }
  } else {
    this.testoDisplay = 'ERROR: Invalid Operation';
  }
  this.result = true;
}
 
getReset(){
  this.testoDisplay = '';

  this.setOperatore = false;
}
}
