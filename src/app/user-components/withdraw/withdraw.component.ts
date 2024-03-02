import {Component, OnInit} from '@angular/core';
import {MoneyUserService} from '../../services/money-user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
  withdrawForm: FormGroup;
  internationalBanks = [
    'Bank of America',
    'Deutsche Bank',
    'HSBC',
  ];

  constructor(private fb: FormBuilder, private moneyUser: MoneyUserService) {
  }

  ngOnInit(): void {
    this.withdrawForm = this.fb.group({
      birthDate: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      accountHolderName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s\-]+$/)]],
      accountNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      bankName: ['', Validators.required],
      transactionAmount: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]]
    });
  }

  submitForm(): void {
    if (this.withdrawForm.valid) {
      // @ts-ignore
      const transactionAmount = parseFloat(this.withdrawForm.get('transactionAmount').value);
      this.moneyUser.getUserBalance().subscribe(response => {
        if (response.data < transactionAmount) {
          this.moneyUser.showAlertMsj("You don't have enough balance to make this transaction");
        } else {
          this.moneyUser.sendWithdrawRequest(transactionAmount);
          this.moneyUser.setMoney(transactionAmount);
          this.withdrawForm.reset();
          Object.keys(this.withdrawForm.controls).forEach(key => {
            // @ts-ignore
            this.withdrawForm.get(key).setErrors(null);
          });
        }
      })
    } else {
      this.moneyUser.showAlertMsj('Invalid form data. Please check and try again');
    }
  }
}
