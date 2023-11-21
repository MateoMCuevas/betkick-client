import { Component } from '@angular/core';
import { cardToggle } from './card-animations';
import {BetService} from "../bet.service"
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-card-bet',
  templateUrl: './card-bet.component.html',
  styleUrls: ['./card-bet.component.css'],
  animations: [cardToggle]
})
export class CardBetComponent {
  cardDelete = false;
  isCardVisible = true;
  listBets: any=null

  constructor(
    private betService: BetService
  ){}

  ngOnInit() {
    this.betService.listBets$.subscribe((datos) => {
      this.listBets = datos;
    });
  }
  sendData(){
    this.listBets//enviarlo al back
  }

  toggleCardVisibility() {
    this.isCardVisible = !this.isCardVisible;
  }

  deleteAll() {
    this.betService.deleteList
  }
}
