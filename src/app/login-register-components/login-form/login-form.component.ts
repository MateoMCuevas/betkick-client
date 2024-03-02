import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {

  constructor(private authService: AuthService) {
  }

  login: string = "";
  password: string = "";

  onSubmitLogin(): void {
    this.authService.login({"login": this.login, "password": this.password});
  }

}
