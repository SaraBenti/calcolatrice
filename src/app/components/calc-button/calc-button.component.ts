import { Component,Input,EventEmitter,Output } from '@angular/core';



@Component({
  selector: 'app-calc-button',
  templateUrl: './calc-button.component.html',
  styleUrls: ['./calc-button.component.css']
})
export class CalcButtonComponent {

  @Input() buttonText: string="";
  @Output() buttonClick: EventEmitter<string> = new EventEmitter<string>();

  handleClick() {
    this.buttonClick.emit(this.buttonText);
  }
}
