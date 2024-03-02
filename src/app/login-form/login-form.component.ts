import { EventEmitter, Component, Output } from '@angular/core';
import {AxiosService} from "../service/axios.service";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {

  constructor(private authService: AuthService) { }

  active: string = "login";
  firstName: string = "";
  lastName: string = "";
  login: string = "";
  password: string = "";

  onLoginTab(): void {
    this.active = "login";
  }

  onRegisterTab(): void {
    this.active = "register";
  }

  onSubmitLogin(): void {
    this.authService.login({"login": this.login, "password": this.password});
  }

  onSubmitRegister(): void {
    this.authService.register({"firstName": this.firstName, "lastName": this.lastName, "login": this.login, "password": this.password});
  }
}
