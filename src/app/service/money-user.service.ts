import {Injectable} from '@angular/core';
import {BehaviorSubject, delay, from, map, Observable} from 'rxjs';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AuthService} from "./auth.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import {AxiosService} from "./axios.service";

@Injectable({
  providedIn: 'root'
})
export class MoneyUserService {

  private money: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private axiosService: AxiosService, private authService: AuthService,  private snackBar: MatSnackBar) {
  }

  setMoney(moneyDeposit: number) {
    const actualMoney = this.money.value;
    let newMoney = actualMoney + moneyDeposit;
    this.money.next(newMoney);
  }

  replaceMoney(newMoney: number) {
    this.money.next(newMoney);
  }

  getUserBalance() {
    const userId = this.authService.userId!;
    const encodedUserId = encodeURIComponent(userId);
    const apiUrl = `/api/user/balance?userId=${encodedUserId}`;

    // Make the request using the custom request method
    return from(this.axiosService.request('get', apiUrl))

  }

  sendWithdrawRequest(withdrawAmount: number) {
    const userId = this.authService.userId!;
    const apiUrl = `/api/user/withdraw?userId=${userId}`;

    // Make the request using the custom request method
    this.axiosService.request('post', apiUrl, withdrawAmount)
      .then((response) => {
        this.showAlertMsj('Successful withdrawal');
      })
      .catch((error) => {
        this.showAlertMsj('Withdraw failed');
      });
  }

  sendDepositRequest(depositAmount: number) {
    const userId = this.authService.userId!;
    const apiUrl = `/api/user/deposit?userId=${userId}`;

    // Make the request using the custom request method
    this.axiosService.request('post', apiUrl,  depositAmount)
      .then((response) => {
        this.showAlertMsj('Successful deposit');
      })
      .catch((error) => {
        this.showAlertMsj('Deposit failed');
      });
  }

  showAlertMsj(msj: string): void {
    const alertMsj = this.snackBar.open(msj, 'Close', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
