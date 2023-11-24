import { Component, booleanAttribute } from '@angular/core';
import { MoneyUserService } from '../service/money-user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent {
  withdrawMoney:number;
  moneyUser:number;
  constructor(private user: MoneyUserService, private snackBar: MatSnackBar) {}
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
    this.showMessage("SUCCESSFUL WITHDRAW")
  }
  getUserMoney(){
    this.user.getUserBalance().subscribe((number: number) => {
      this.moneyUser = number;
    });
  }

  showMessage(msj: string): void {
    const mensajeEmergente = this.snackBar.open(msj, 'Cerrar', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center', 
    });
  }
}
