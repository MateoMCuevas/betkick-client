import { Component, booleanAttribute } from '@angular/core';
import { MoneyUserService } from '../money-user.service';

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
    this.user.setMoney( -this.withdrawMoney);
  }
  getUserMoney(){
    this.user.getMoney().subscribe((number) => {
      this.moneyUser = number;
    });
  }
}
