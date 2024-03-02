import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, lastValueFrom, map, Observable} from "rxjs";
import {User} from "../model";
import {Location} from '@angular/common';
import {AxiosService} from "./axios.service";
import {Router} from "@angular/router";

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userId: string | undefined;
  username: string | undefined;
  user: User;
  loginBoolean: boolean = false;

  constructor(private router: Router, private axiosService: AxiosService) {
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
        console.warn("Error logging in")
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

}
