import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
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

    return this.http.post<any>('/api/user/withdraw', withdrawAmount * -1, {params})
      .subscribe(
        (response) => {
          // Handle successful response
          console.log('Withdraw request successful:', response);
        },
        (error) => {
          // Handle error
          console.error('Withdraw request error:', error);
        }
      );
  }

  sendDepositRequest(depositAmount: number) {
    const userId = this.authService.userId!;
    const params = new HttpParams().set('userId', userId);

    return this.http.post<any>('/api/user/deposit', depositAmount, {params})
      .subscribe(
        (response) => {
          // Handle successful response
          console.log('Deposit request successful:', response);
        },
        (error) => {
          // Handle error
          console.error('Deposit request error:', error);
        }
      );
  }

  getMoney(): Observable<number> {
    return this.money.asObservable();
  }
  showAlertMsj(msj: string): void {
    const mensajeEmergente = this.snackBar.open(msj, 'CLOSE', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
