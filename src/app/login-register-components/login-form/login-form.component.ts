import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  hide: boolean;

  constructor(protected authService: AuthService, private fb: FormBuilder) {
    this.hide = true;
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
          Validators.pattern(/^[a-zA-Z0-9_-]+$/)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
        ]
      ],
    });
  }

  onSubmitLogin(): void {
    if (this.loginForm.valid) {
      this.authService.login({"login": this.loginForm.get('login')?.value,
        "password": this.loginForm.get('password')?.value});
    } else {
      this.authService.showAlertMsj('Invalid form data. Please check and try again');
    }
  }

}
