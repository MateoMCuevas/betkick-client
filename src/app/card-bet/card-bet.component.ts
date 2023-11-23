import {Component, OnInit} from '@angular/core';
import { cardToggle } from './card-animations';
import { FormArray, FormGroup } from '@angular/forms';
import { CardMatchComponent } from '../card-match/card-match.component';
import { MoneyUserService } from '../money-user.service';
import {BetService} from "../bet.service"

@Component({
  selector: 'app-card-bet',
  templateUrl: './card-bet.component.html',
  styleUrls: ['./card-bet.component.css'],
  animations: [cardToggle]
})
export class CardBetComponent implements OnInit {
  cardDelete = false;
  isCardVisible = true;
  listBets: any = null
  listBetsLenght: any = null
  alertMsj = false
  money: number;

  constructor(
    private betService: BetService, private moneyUser: MoneyUserService
  ) { }

  ngOnInit() {
    this.betService.listBets$.subscribe((datos) => {
      this.listBets = datos;
      this.listBetsLenght = (this.listBets as FormArray).length;
      if (this.listBetsLenght<=0){this.alertMsj=false}
    });
  }

  getUserMoney(){
    this.moneyUser.getMoney().subscribe((number: number) => {
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

  //Function that loops through the listBets and calls the child component's function
  checkBetAmounts(): boolean{
    let flag:boolean=true
    this.listBets.forEach((betData: FormGroup) => {
      const betAmount = betData.get('betAmount')?.value;
      if (betAmount === 0 || !betAmount) {
      flag= false;
      }
    })
    return flag;
  }

  //Function that sends the bets made to the backend
  sendData() {
    if (this.checkBetAmounts()&&this.listBetsLenght>0) {
      this.alertMsj=false
      this.betService.sendDataToBackend().subscribe(
        (response) => {
          console.log("Backend's response: ", response);
        },
        (error) => {
          alert(error.error.apierror.message)
          console.error('An error occurred: ', error.error.apierror.message);
        }
      );
      this.deleteAll()
    }else if(!this.checkBetAmounts()){
      this.alertMsj=true
    }else{
      this.alertMsj=false
    }
  }

  toggleCardVisibility() {
    this.isCardVisible = !this.isCardVisible;
  }

  deleteAll() {
    this.betService.deleteList()
  }
}
