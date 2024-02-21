import {Injectable} from '@angular/core';
import {BehaviorSubject, delay, Observable} from 'rxjs';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AuthService} from "./auth.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MoneyUserService {

  private money: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient, private authService: AuthService,  private snackBar: MatSnackBar) {
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
    let params = new HttpParams();
    params = params.set('userId', encodedUserId);

    return this.http.get<any>('api/user/balance', {params})
  }

  sendWithdrawRequest(withdrawAmount: number) {
    const userId = this.authService.userId!;
    const params = new HttpParams().set('userId', userId);

    return this.http.post<any>('https://34.71.77.27:8080/api/user/withdraw', withdrawAmount, {params})
      .subscribe(
        (response) => {
          this.showAlertMsj('Successful withdrawal');
        },
        (error) => {
          this.showAlertMsj('Withdraw failed');
        }
      );
  }

  sendDepositRequest(depositAmount: number) {
    const userId = this.authService.userId!;
    const params = new HttpParams().set('userId', userId);

    return this.http.post<any>('https://34.71.77.27:8080/api/user/deposit', depositAmount, {params})
      .subscribe(
        (response) => {
          this.showAlertMsj('Successful deposit');
        },
        (error) => {
          this.showAlertMsj('Deposit failed');
        }
      );
  }

  getMoney(): Observable<number> {
    return this.money.asObservable();
  }
  showAlertMsj(msj: string): void {
    const alertMsj = this.snackBar.open(msj, 'Close', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
