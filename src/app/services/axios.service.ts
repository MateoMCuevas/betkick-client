import {Injectable} from '@angular/core';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor() {
    axios.defaults.baseURL = 'https://betkick-api.leandroruhl.com';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  getAuthToken(): string | null {
    return window.localStorage.getItem('auth_token');
  }

  setAuthToken(token: string | null): void {
    if (token !== null) {
      window.localStorage.setItem("auth_token", token)
    } else {
      window.localStorage.removeItem("auth_token")
    }
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token);
      const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds
      return decodedToken.exp < currentTimeInSeconds;
    } catch (error) {
      console.warn("Invalid or expired JWT")
      return true; // Error decoding or no 'exp' claim
    }
  }

  request(method: string, url: string, data?: any, params?: any): Promise<any> {
    let headers = {};

    const authToken = this.getAuthToken();

    if (authToken !== null && !this.isTokenExpired(authToken)) {
      headers = {"Authorization": "Bearer " + authToken};
    } else if (authToken !== null && this.isTokenExpired(authToken)) { // if there is a token but it is expired
      this.setAuthToken(null);
      window.localStorage.removeItem("user")
      location.href = 'home';
      console.warn("Expired token has been invalidated")
    }

    if (params) {
      return axios.request({
        method: method,
        url: url,
        data: data,
        params: params,
        headers: headers
      });
    } else {
      return axios.request({
        method: method,
        url: url,
        data: data,
        headers: headers
      });
    }
  }
}
