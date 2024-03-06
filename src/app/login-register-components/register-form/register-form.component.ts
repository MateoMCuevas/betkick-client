import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;
  hide: boolean;

  constructor(protected authService: AuthService, private fb: FormBuilder) {
    this.hide = true;
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z]+$/)
        ]
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z]+$/)
        ]
      ],
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
        ]
      ],
    });
  }

  onSubmitRegister(): void {
    if (this.registerForm.valid) {
      this.authService.register({"login": this.registerForm.get('login')?.value,
        "firstName": this.registerForm.get('firstName')?.value, "lastName": this.registerForm.get('lastName')?.value,
        "password": this.registerForm.get('password')?.value});
    } else {
      this.authService.showAlertMsj('Invalid form data. Please check and try again');
    }
  }
}
