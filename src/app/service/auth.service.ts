import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, lastValueFrom, map, Observable} from "rxjs";
import {User} from "../model";
import {Location} from '@angular/common';

const headers = new HttpHeaders().set('Accept', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $authenticationState = new BehaviorSubject<boolean>(false);
  userId: string | undefined;
  userName: string | undefined;
  loginBoolean: boolean = false;
  constructor(private http: HttpClient, private location: Location) {
  }

  getUser(): Observable<User> {
    return this.http.get<User>('http://betkick-api.leandroruhl.com:8080/api/user', {headers}, )
      .pipe(map((response: User) => {
          if (response !== null) {
            this.$authenticationState.next(true);
            this.userId = response.sub;
            this.userName = response.nickname;
            this.loginBoolean = true;
          }
          return response;
        })
      );
  }

  async isAuthenticated(): Promise<boolean> {
    const user = await lastValueFrom(this.getUser());
    return user !== null;
  }

  login(): void {
    location.href = `${location.origin}${this.location.prepareExternalUrl('http://betkick-api.leandroruhl.com:8080/oauth2/authorization/okta')}`;
  }

  logout(): void {
    this.http.post('http://betkick-api.leandroruhl.com:8080/api/logout', {}, { withCredentials: true }).subscribe(
      (response: any) => {
        // Redirect to the logout URL received from the server
        window.location.href = response.logoutUrl;
      },
      (error) => {
      }
    );
  }

  getLoginBoolean():boolean{
    return this.loginBoolean
  }
}
