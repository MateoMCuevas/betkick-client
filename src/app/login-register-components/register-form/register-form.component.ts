import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {

  constructor(private authService: AuthService) {
  }

  firstName: string = "";
  lastName: string = "";
  login: string = "";
  password: string = "";

  onSubmitRegister(): void {
    this.authService.register({
      "firstName": this.firstName,
      "lastName": this.lastName,
      "login": this.login,
      "password": this.password
    });
  }
}
