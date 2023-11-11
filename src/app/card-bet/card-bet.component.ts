import { Component, EventEmitter, Output } from '@angular/core';
import { cardToggle } from './card-animations';

@Component({
  selector: 'app-card-bet',
  templateUrl: './card-bet.component.html',
  styleUrls: ['./card-bet.component.css'],
  animations: [cardToggle] 
})
export class CardBetComponent {
  cardDelete = false;
  isCardVisible = true;
  isButtonVisible = true;
  toggleCardVisibility() {
    this.isCardVisible = !this.isCardVisible;
  }
  toggleButtonVisibility() {
    this.isButtonVisible = !this.isButtonVisible;
  }
  deleteCard(){
    this.cardDelete = true;
  }
}