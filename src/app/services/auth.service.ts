import {Injectable} from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {User} from "../model";
import {AxiosService} from "./axios.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userId: string | undefined;
  username: string | undefined;
  user: User;
  loginBoolean: boolean = false;

  constructor(private snackBar: MatSnackBar, private axiosService: AxiosService) {
    if (this.user === undefined) {
      // @ts-ignore
      let user = JSON.parse(window.localStorage.getItem("user"));
      if (user !== null) {
        this.user = user;
        this.userId = user.id;
        this.username = user.login;
        this.loginBoolean = true;
      } else {
        this.loginBoolean = false;
      }
    }
  }

  getLoginBoolean(): boolean {
    return this.loginBoolean;
  }

  getUser(): User {
    // @ts-ignore
    return JSON.parse(window.localStorage.getItem("user"));
  }

  async isAuthenticated(): Promise<boolean> {
    return this.axiosService.getAuthToken() !== null;
  }

  login(input: any): void {
    this.axiosService.request(
      "POST",
      "api/login",
      {
        login: input.login,
        password: input.password
      }).then(
      response => {
        this.loadUser(response);
      }).catch(
      error => {
        this.axiosService.setAuthToken(null);
        this.showAlertMsj("Incorrect username or password");
      }
    );
  }

  register(input: any): void {
    this.axiosService.request(
      "POST",
      "api/register",
      {
        firstName: input.firstName,
        lastName: input.lastName,
        login: input.login,
        password: input.password
      }).then(
      response => {
        this.loadUser(response);
      }).catch(
      error => {
        this.axiosService.setAuthToken(null);
        this.showAlertMsj("Username is already taken or is invalid");
      }
    );
  }

  private loadUser(response: any) {
    this.axiosService.setAuthToken(response.data.token);
    this.user = response.data;
    this.userId = response.data.id;
    this.username = response.data.login;
    this.loginBoolean = true;
    window.localStorage.setItem("user", JSON.stringify(response.data))
    location.href = 'home';
  }

  logout(): void {
    this.axiosService.setAuthToken(null);
    window.localStorage.removeItem("user")
    location.href = 'home';
  }

  showAlertMsj(msj: string): void {
    const alertMsj = this.snackBar.open(msj, 'Close', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

}
