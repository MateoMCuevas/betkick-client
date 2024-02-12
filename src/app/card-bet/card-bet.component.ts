import { Component, OnInit } from '@angular/core';
import { cardToggle } from './card-animations';
import { FormArray, FormGroup } from '@angular/forms';
import { CardMatchComponent } from '../card-match/card-match.component';
import { MoneyUserService } from '../service/money-user.service';
import { BetService } from "../service/bet.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthGuard } from '../auth-guard.guard';
import { AuthService } from '../service/auth.service';
import {map, Observable} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

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
    private betService: BetService,
    private moneyUser: MoneyUserService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.betService.listBets$.subscribe((datos) => {
      this.listBets = datos;
      this.listBetsLength = (this.listBets as FormArray).length;
      if (this.listBetsLength <= 0) { this.alertBetAmount = false }
    });
  }
  getUserMoney(): Observable<number> {
    return this.moneyUser.getUserBalance().pipe(
      map((balance: number) => {
        return balance;
      })
    );
  }

  shouldShowCardBetContainer(): boolean {
    const currentRoute = this.router.url
    return currentRoute?.includes("home")
  }

  async updateMoney() {
    // @ts-ignore
    const balance: number = await this.getUserMoney().toPromise();
    this.moneyUser.replaceMoney(balance);
  }

  totalBetAmount() {
    let totalBetAmount: number = 0;
    this.listBets.forEach((form: FormGroup) => {
      totalBetAmount = totalBetAmount + parseFloat(form.get('betAmount')?.value)
    });
    return totalBetAmount;
  }
  async checkUserMoney(): Promise<boolean> {
    try {
      // @ts-ignore
      const balance: number = await this.getUserMoney().toPromise();
      return this.totalBetAmount() <= balance;
    } catch (error) {
      console.error('Error checking user money:', error);
      return false;
    }
  }

  //Function that loops through the listBets and calls the child component's function
  checkBetAmounts(): boolean {
    let flag: boolean = true
    this.listBets.forEach((betData: FormGroup) => {
      const betAmount = betData.get('betAmount')?.value;
      if (betAmount <= 0 || !betAmount) {
        flag = false;
      }
    })
    return flag;
  }

  //Function that sends the bets made to the backend
  async sendData() {
    if (this.checkLogin()) {
      const enoughUserMoney = await this.checkUserMoney();
      if (enoughUserMoney && this.checkBetAmounts() && this.listBetsLength > 0) {
        this.alertBetAmount = false
        this.alertUserMoney = false
        this.betService.sendDataToBackend()
          .subscribe(
          (response) => {
            this.moneyUser.showAlertMsj('Your bets have been placed!')
          },
          (error) => {
            this.moneyUser.showAlertMsj('Bets failed')
          }
        );
        this.updateMoney()
        this.betService.deleteList()
        this.alertBetAmount = false
        this.alertUserMoney = false
      } else if (!this.checkBetAmounts()) {
        this.alertBetAmount = true
        this.alertUserMoney = false
      } else if (!enoughUserMoney) {
        this.alertUserMoney = true
        this.alertBetAmount = false
      } else {
        this.alertBetAmount = false
        this.alertUserMoney = false
      }
    } else {
      this.moneyUser.showAlertMsj('Please login or register')
    }
  }

  toggleCardVisibility() {
    this.isCardVisible = !this.isCardVisible;
  }

  deleteAll(event: Event) {
    event.stopPropagation();
    this.betService.deleteList()
    this.alertBetAmount = false
    this.alertUserMoney = false
  }
  checkLogin(): boolean {
      return this.auth.getLoginBoolean()
  }

}
