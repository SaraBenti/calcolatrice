import { Component } from '@angular/core';

@Component({
  selector: 'app-calcolatrice',
  templateUrl: './calcolatrice.component.html',
  styleUrls: ['./calcolatrice.component.css'],
})
export class CalcolatriceComponent {
  testoDisp: string = '0';

  operando1: number | null = null;
  operando2: number | null = null;
  operatore: string | null = null;

  buffer: string = '';
  firstOperation: boolean = true;

  setOperatore = false; // indica se è in atto un'operazione
  daCalcolare = '';
  result = false;

  pressButton(but: string) {
    if (but === '/' || but === '*' || but === '-' || but === '+') {
      const lastBut = this.testoDisp[this.testoDisp.length - 1];
      console.log('parseButton: ', lastBut, ' button: ', but);
      if (
        lastBut === '/' ||
        lastBut === '*' ||
        lastBut === '-' ||
        lastBut === '+'
      ) {
        this.setOperatore = true;
      }
      if (this.setOperatore || this.testoDisp === '') {
        return;
      }
      this.operando1 = parseFloat(this.testoDisp);
      this.operatore = but;

      this.setOperatore = true;
    }
    if (this.testoDisp.length === 10) {
      return;
    }
    this.testoDisp += but;
  }
  getResult() {
    this.daCalcolare = this.testoDisp;
    this.operando2 = parseFloat(
      this.testoDisp.split(this.operatore != null ? this.operatore : '')[1]
    );
    if (
      this.operatore === '/' &&
      this.operando1 != null &&
      this.operando2 != null
    ) {
      this.testoDisp = (this.operando1 / this.operando2).toString();
      if (this.testoDisp.length > 9) {
        this.testoDisp = this.testoDisp.substring(0, 9);
      }
    } else if (
      this.operatore === '*' &&
      this.operando1 != null &&
      this.operando2 != null
    ) {
      this.testoDisp = (this.operando1 * this.operando2).toString();

      if (this.testoDisp.length > 9) {
        this.testoDisp = 'ERROR';
      }
    } else if (
      this.operatore === '-' &&
      this.operando1 != null &&
      this.operando2 != null
    ) {
      this.testoDisp = (this.operando1 - this.operando2).toString();
    } else if (
      this.operatore === '+' &&
      this.operando1 != null &&
      this.operando2 != null
    ) {
      this.testoDisp = (this.operando1 + this.operando2).toString();

      if (this.testoDisp.length > 9) {
        this.testoDisp = 'ERROR';
      }
    } else {
      this.testoDisp = 'ERROR';
    }
    this.result = true;
  }

  getReset() {
    this.testoDisp = '';

    this.setOperatore = false;
  }

  doReset() {
    this.operando1 = null;
    this.operando2 = null;
    this.operatore = null;
    this.buffer = '';
    this.testoDisp = '0';
  }

  typeOfButton_old(but: string) {
    switch (but) {
      case 'AC':
        this.getReset();
        break;
      case '=':
        this.getResult();
        break;
      default:
        this.pressButton(but);
        break;
    }
  }

  typeOfButton(but: string) {
    console.log(
      'typeOfButton() inizio: buffer=',
      this.buffer,
      'but=',
      but,
      ', op1=',
      this.operando1,
      ', op=',
      this.operatore,
      'op2=',
      this.operando2
    );

    if (but == 'AC') {
      this.doReset();
      return;
    }

    if (this.operando1 == null) {
      if (
        but == '0' ||
        but == '1' ||
        but == '2' ||
        but == '3' ||
        but == '4' ||
        but == '5' ||
        but == '6' ||
        but == '7' ||
        but == '8' ||
        but == '9'
      ) {
        this.buffer += but;
        this.testoDisp = this.buffer;
      } else {
        // leggendo operando1, è stato premuto un tasto diverso dal numero
        if (
          this.operatore == null &&
          (but == '+' || but == '-' || but == '*' || but == '/')
        ) {
          this.operando1 = parseFloat(this.buffer);
          this.operatore = but;
          this.buffer = '';
        }
      }
    } else if (this.operatore != null && this.operando2 == null) {
      if (
        but == '0' ||
        but == '1' ||
        but == '2' ||
        but == '3' ||
        but == '4' ||
        but == '5' ||
        but == '6' ||
        but == '7' ||
        but == '8' ||
        but == '9'
      ) {
        this.buffer += but;
        this.testoDisp = this.buffer;
      } else {
        // leggendo operando2, è stato premuto un tasto diverso dal numero
        if (
          but == '+' ||
          but == '-' ||
          but == '*' ||
          but == '/' ||
          but == '='
        ) {
          this.operatore = but == '=' ? this.operatore : but;
          this.operando2 = parseFloat(this.buffer);
          this.buffer = '';

          const res: number = this.calcolare(
            this.operatore,
            this.operando1,
            this.operando2
          );

          this.operando1 = res;

          this.operatore = null;
          this.operando2 = null;
          this.testoDisp = String(res);
        }
      }
    }
    console.log(
      'typeOfButton() fine: buffer=',
      this.buffer,
      'but=',
      but,
      ', op1=',
      this.operando1,
      ', op=',
      this.operatore,
      'op2=',
      this.operando2
    );
  }

  calcolare(op: string, op1: number, op2: number): number {
    switch (op) {
      case '+':
        return op1 + op2;
        break;
      case '-':
        return op1 - op2;
        break;
      case '*':
        return op1 * op2;
        break;
      case '/':
        return op1 / op2;
        break;
      default:
        return 0;
    }
  }

  typeOfButton_new(but: string) {
    console.log(
      'typeOfButton() inizio: buffer=',
      this.buffer,
      'but=',
      but,
      ', op1=',
      this.operando1,
      ', op=',
      this.operatore,
      'op2=',
      this.operando2
    );

    if (but == 'AC') {
      this.doReset();
      return;
    }

    if (this.operando1 == null) {
      if (
        but == '0' ||
        but == '1' ||
        but == '2' ||
        but == '3' ||
        but == '4' ||
        but == '5' ||
        but == '6' ||
        but == '7' ||
        but == '8' ||
        but == '9'
      ) {
        this.buffer += but;
        this.testoDisp = this.buffer;
      } else {
        // leggendo operando1, è stato premuto un tasto diverso dal numero
        if (
          this.operatore == null &&
          (but == '+' || but == '-' || but == '*' || but == '/')
        ) {
          this.operando1 = parseFloat(this.buffer);
          this.operatore = but;
          this.buffer = '';
        }
      }
    } else if (this.operatore != null && this.operando2 == null) {
      if (
        but == '0' ||
        but == '1' ||
        but == '2' ||
        but == '3' ||
        but == '4' ||
        but == '5' ||
        but == '6' ||
        but == '7' ||
        but == '8' ||
        but == '9'
      ) {
        this.buffer += but;
        this.testoDisp = this.buffer;
      } else {
        // leggendo operando2, è stato premuto un tasto diverso dal numero

        if (
          but == '+' ||
          but == '-' ||
          but == '*' ||
          but == '/' ||
          but == '='
        ) {
          if (but == '=') {
            if (this.buffer.length == 0) {
              return; // non fare nulla se l'utente preme '=' senza un operando2
            }

            //errore /0
            if (this.operatore == '/' && this.buffer == '0') {
              this.testoDisp = 'Errore';
              return;
            }
            this.operando2 = parseFloat(this.buffer);
            this.buffer = '';

            const res: number = this.calcolare(
              this.operatore,
              this.operando1,
              this.operando2
            );
            console.log(res);
            this.operando1 = res;
            this.testoDisp = String(res);

            this.operando2 = null;
          } else if (but == '+' || but == '-' || but == '*' || but == '/') {
            // cambio operatore
            this.operatore = but;
          }
        }
      }
    }
    console.log(
      'typeOfButton() fine: buffer=',
      this.buffer,
      'but=',
      but,
      ', op1=',
      this.operando1,
      ', op=',
      this.operatore,
      'op2=',
      this.operando2
    );
  }
}
