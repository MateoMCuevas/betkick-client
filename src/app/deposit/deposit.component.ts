import { Component } from '@angular/core';
import { MoneyUserService } from '../service/money-user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent {
  hide = true;
  moneyDeposit: number;

  constructor(private moneyUser: MoneyUserService,private snackBar: MatSnackBar) {}

  depositMoney() {
    this.moneyUser.sendDepositRequest(this.moneyDeposit)
    this.moneyUser.setMoney(this.moneyDeposit)
    this.showMessage('SUCCESSFUL DEPOSIT')
  }

  showMessage(msj: string): void {
    const mensajeEmergente = this.snackBar.open(msj, 'Cerrar', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center', 
    });
  }
}
