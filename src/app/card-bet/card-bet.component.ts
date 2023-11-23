import {Component, OnInit} from '@angular/core';
import { cardToggle } from './card-animations';
import {BetService} from "../service/bet.service"
import { FormGroup } from '@angular/forms';
import { MoneyUserService } from '../money-user.service';

@Component({
  selector: 'app-card-bet',
  templateUrl: './card-bet.component.html',
  styleUrls: ['./card-bet.component.css'],
  animations: [cardToggle]
})
export class CardBetComponent implements OnInit {
  cardDelete = false;
  isCardVisible = true;
  listBets: any=null
  money: number;
  constructor(
    private betService: BetService, private moneyUser: MoneyUserService
  ){}
  getUserMoney(){
    this.moneyUser.getMoney().subscribe((number) => {
      this.money = number;
    });

  }
  totalBetAmount(){
    let totalBetAmount: number = 0;
   this.listBets.forEach((form:FormGroup) => {
    totalBetAmount = totalBetAmount + parseFloat(form.get('betAmount')?.value)
   });
  return totalBetAmount;
  }
  shouldDisableButton(): boolean{
    this.getUserMoney()
    let boolean: boolean = false;
    if(this.totalBetAmount() > this.money){
      boolean = true;
    }
    return boolean
  }
  ngOnInit() {
    this.betService.listBets$.subscribe((datos) => {
      this.listBets = datos;
    });
  }
  sendData() {
      if (this.listBets !== null) {
        this.betService.sendDataToBackend().subscribe(
          (response) => {
            console.log("Backend's response: ", response);
          },
          (error) => {
            alert(error.error.apierror.message)
            console.error('An error occurred: ', error.error.apierror.message);
          }
        );
      }
  }

  toggleCardVisibility() {
    this.isCardVisible = !this.isCardVisible;
  }

  deleteAll() {
    this.betService.deleteList()
  }
}
