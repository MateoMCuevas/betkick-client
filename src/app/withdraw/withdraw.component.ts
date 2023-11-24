import { Component, OnInit, booleanAttribute } from '@angular/core';
import { MoneyUserService } from '../service/money-user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  withdrawMoney: number;
  moneyUser: number;
  withdrawForm: FormGroup
  constructor(private user: MoneyUserService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.withdrawForm = this.fb.group({
      withdrawAmount: ['', [Validators.required, Validators.min(0)]],
      cbu: ['', Validators.required],
      bankName: ['', Validators.required],
      accountHolder: ['', Validators.required]
    });
  }

  withdrawMoneyEvent() {
    this.getUserMoney()
    if (this.withdrawForm.valid && this.withdrawMoney<=this.moneyUser) {
      this.user.sendWithdrawRequest(-this.withdrawMoney);
      this.user.setMoney(-this.withdrawMoney);
      this.user.showAlertMsj('SUCCESFUL WITHDRAWAL')
    } else {
      this.user.showAlertMsj('PLEASE FILL CORRECTLY ALL THE FIELDS OF THE FORM OR CHECK YOUR BALANCE')
    }
  }

  getUserMoney() {
    this.user.getUserBalance().subscribe((number: number) => {
      this.moneyUser = number;
    });
  }
}
