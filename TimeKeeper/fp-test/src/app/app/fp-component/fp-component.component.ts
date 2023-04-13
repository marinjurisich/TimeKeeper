import { Component } from '@angular/core';

@Component({
  selector: 'app-fp-component',
  templateUrl: './fp-component.component.html',
  styleUrls: ['./fp-component.component.scss']
})
export class FpComponentComponent {

  selectedDate: string = "";

  showMonths: number = 4;

}
