import { Component } from '@angular/core';
import { cardToggle } from './card-animations';
import { BetService } from "../bet.service"
import { FormArray, FormGroup } from '@angular/forms';
import { CardMatchComponent } from '../card-match/card-match.component';

@Component({
  selector: 'app-card-bet',
  templateUrl: './card-bet.component.html',
  styleUrls: ['./card-bet.component.css'],
  animations: [cardToggle]
})
export class CardBetComponent {
  cardDelete = false;
  isCardVisible = true;
  listBets: any = null
  listBetsLenght: any = null
  alertMsj = false

  constructor(
    private betService: BetService
  ) { }

  ngOnInit() {
    this.betService.listBets$.subscribe((datos) => {
      this.listBets = datos;
      this.listBetsLenght = (this.listBets as FormArray).length;
      this.checkBetAmounts
      console.log(this.alertMsj);

    });
  }

  //function that get the exact time the bet is placed
  setPlacedAt() {
    const fecha = new Date();
    const placedAt = `${fecha.getFullYear().toString()}/
    ${('0' + (fecha.getMonth() + 1)).slice(-2)}/
    ${('0' + fecha.getDate()).slice(-2)} 
    ${('0' + fecha.getHours()).slice(-2)}:
    ${('0' + fecha.getMinutes()).slice(-2)}`

    this.listBets.forEach((betData: FormGroup) => {
      betData.get('placedAt')?.setValue(placedAt);
    });
  }

  //Function that loops through the listBets and calls the child component's function
  checkBetAmounts() {
    this.listBets.forEach((betData: FormGroup) => {
      const betAmount = betData.get('betAmount')?.value;
      if (betAmount != 0 || betAmount) {
        console.log('error');
        this.alertMsj = true
      }
      else{
        this.alertMsj = false
      }
    })
  }

  //Function that sends the bets made to the backend
  sendData() {
    if (this.alertMsj) {
      this.setPlacedAt()
      this.listBets//enviarlo al back
      console.log('mandando al back');
      this.deleteAll
    }else{
      this.alertMsj=true
    }
  }

  toggleCardVisibility() {
    this.isCardVisible = !this.isCardVisible;
  }

  deleteAll() {
    this.betService.deleteList()
  }
}
