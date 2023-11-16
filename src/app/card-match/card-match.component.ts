import {Component} from '@angular/core';


@Component({
  selector: 'app-card-match',
  templateUrl: './card-match.component.html',
  styleUrls: ['./card-match.component.css']
})
export class CardMatchComponent {
  number: number = 0;
  cardDelete: boolean= false


  calculate(): number {
    return this.number * 2;
  }
  deleteCard()
  {
    this.cardDelete=true
  }
}


