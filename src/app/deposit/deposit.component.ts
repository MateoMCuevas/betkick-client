import { Component } from '@angular/core';
import { MoneyUserService } from '../service/money-user.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent {
  hide = true;
  moneyDeposit: number;

  constructor(private moneyUser: MoneyUserService) {}

  depositMoney() {
    this.moneyUser.setMoney(this.moneyDeposit);
  }

}
