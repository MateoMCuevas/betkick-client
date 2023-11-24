import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./service/auth.service";

/*import { CanActivateFn } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
*/
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    if (await this.authService.isAuthenticated()) {
      return true; // User is authenticated, allow access to the route
    } else {
      // User is not authenticated, redirect to login page
      this.router.navigate(['/home']);
      return false; // Prevent access to the route
    }
  }
}