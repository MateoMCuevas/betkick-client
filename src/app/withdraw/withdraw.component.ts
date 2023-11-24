import { Component, booleanAttribute } from '@angular/core';
import { MoneyUserService } from '../service/money-user.service';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent {
  withdrawMoney:number;
  moneyUser:number;
  constructor(private user: MoneyUserService) {}
  shouldDisableButtonWithdraw(): boolean{
    this.getUserMoney()
    let boolean: boolean = false;
    if(this.withdrawMoney > this.moneyUser){
      boolean = true;
    }
    return boolean
  }
  withdrawMoneyEvent(){
    this.user.sendWithdrawRequest(-this.withdrawMoney);
    this.user.setMoney(-this.withdrawMoney);
  }
  getUserMoney(){
    this.user.getUserBalance().subscribe((number: number) => {
      this.moneyUser = number;
    });
  }
}
