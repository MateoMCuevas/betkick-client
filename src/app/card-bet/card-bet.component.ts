import {Component, OnInit} from '@angular/core';
import { cardToggle } from './card-animations';
import { FormArray, FormGroup } from '@angular/forms';
import { CardMatchComponent } from '../card-match/card-match.component';
import { MoneyUserService } from '../service/money-user.service';
import {BetService} from "../service/bet.service";

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
  alertMsj = false
  listBetsLength: any = null
  alertBetAmount = false
  alertUserMoney = false
  money: number;

  constructor(
    private betService: BetService, private moneyUser: MoneyUserService
  ) { }

  ngOnInit() {
    this.betService.listBets$.subscribe((datos) => {
      this.listBets = datos;
      this.listBetsLength = (this.listBets as FormArray).length;
      if (this.listBetsLength<=0){this.alertBetAmount=false}
    });
  }
  getUserMoney(){
    this.moneyUser.getUserBalance().subscribe((number: number) => {
      this.money = number;
    });
  }

  updateMoney(){
    this.moneyUser.setMoney(-this.totalBetAmount());
  }
  
  totalBetAmount(){
    let totalBetAmount: number = 0;
   this.listBets.forEach((form:FormGroup) => {
    totalBetAmount = totalBetAmount + parseFloat(form.get('betAmount')?.value)
   });
  return totalBetAmount;
  }
  checkUserMoney(): boolean{
    this.getUserMoney()
    let boolean: boolean = true;
    if(this.totalBetAmount() > this.money){
      boolean = false;
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
    if (this.checkUserMoney()&& this.checkBetAmounts()&& this.listBetsLength>0) {
      this.alertBetAmount=false
      this.alertUserMoney=false
      this.betService.sendDataToBackend().subscribe(
        (response) => {
          console.log("Backend's response: ", response);
        },
        (error) => {
          alert(error.error.apierror.message)
          console.error('An error occurred: ', error.error.apierror.message);
        }
      );
      this.updateMoney()
      this.deleteAll()
    }else if(!this.checkBetAmounts()){
      this.alertBetAmount=true
    }else if(!this.checkUserMoney()){
      this.alertUserMoney=true
    }
    else{
      this.alertBetAmount=false
      this.alertUserMoney=false
    }
  }

  toggleCardVisibility() {
    this.isCardVisible = !this.isCardVisible;
  }

  deleteAll() {
    this.betService.deleteList()
  }
}
