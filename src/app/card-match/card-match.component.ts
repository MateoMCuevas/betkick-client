import { Component } from '@angular/core';


@Component({
  selector: 'app-card-match',
  templateUrl: './card-match.component.html',
  styleUrls: ['./card-match.component.css']
})
export class CardMatchComponent {
  numero: number = 0;
  cardDelete: boolean= false
  
  
  calcular(): number {
    return this.numero * 2; 
  }
  deleteCard()
  {
    this.cardDelete=true
  }
}


