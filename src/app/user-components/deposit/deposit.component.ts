import {Component, OnInit} from '@angular/core';
import {MoneyUserService} from '../../services/money-user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  depositForm: FormGroup;

  constructor(private fb: FormBuilder, private moneyUser: MoneyUserService) {
  }

  ngOnInit(): void {
    this.depositForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      expirationDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{4}$/)]],
      cardHolderName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s\-]+$/)]],
      cardType: ['', Validators.required],
      transactionAmount: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });
  }

  submitForm(): void {
    if (this.depositForm.valid) {
      // @ts-ignore
      const transactionAmount = parseFloat(this.depositForm.get('transactionAmount').value);

      this.moneyUser.sendDepositRequest(transactionAmount);
      this.moneyUser.setMoney(transactionAmount);
      this.depositForm.reset();
      Object.keys(this.depositForm.controls).forEach(key => {
        // @ts-ignore
        this.depositForm.get(key).setErrors(null);
      });
    } else {
      this.moneyUser.showAlertMsj('Invalid form data. Please check and try again');
    }
  }
}
