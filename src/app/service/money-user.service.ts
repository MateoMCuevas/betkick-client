import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoneyUserService {
  
  private money: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  setMoney(moneyDeposit: number) {

    const actualMoney = this.money.value;
    let newMoney = actualMoney + moneyDeposit;
    this.money.next(newMoney);
  }

  getMoney(): Observable <number> {
    return this.money.asObservable();;
  }
}
