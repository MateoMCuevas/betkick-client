import { Component, OnInit } from '@angular/core';
import { MoneyUserService } from '../service/money-user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  hide = true;
  moneyDeposit: number;
  depositForm: FormGroup

  constructor(private moneyUser: MoneyUserService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.depositForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{4}-\d{4}$/)]],
      expirationDate: ['', [Validators.required, Validators.pattern(/^\d{2}\/\d{2}$/)]],
      cvv: ['', Validators.required],
      cardHolderName: ['', Validators.required],
      cardType: ['visa', Validators.required],
      amountToPay: ['', [Validators.required, Validators.min(0)]]
    });
  }

  depositMoney() {
    if (this.depositForm.valid) {
      this.moneyUser.sendDepositRequest(this.moneyDeposit)
      this.moneyUser.setMoney(this.moneyDeposit)
      this.moneyUser.showAlertMsj('SUCCESFUL DEPOSIT')
    }
    else {
      this.moneyUser.showAlertMsj('PLEASE FILL CORRECTLY ALL THE FIELDS OF THE FORM')
    }
  }
}
