import {Component, OnInit} from '@angular/core';
import {User} from "../model";
import {MoneyUserService} from '../service/money-user.service';
import {AuthService} from "../service/auth.service";
import {BetService} from "../service/bet.service";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, tap} from "rxjs";

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  isAuthenticated!: boolean;
  user!: User;
  money: number;
  isSmallScreenBool: boolean;

  constructor(public auth: AuthService, private breakpointObserver: BreakpointObserver,
              private moneyUser: MoneyUserService) {

  }

  isSmallScreen$ = this.breakpointObserver.observe('(max-width: 650px)')
    .pipe(
      map(result => result.matches)
    );

  async ngOnInit() {
    this.isAuthenticated = await this.auth.isAuthenticated();
    if (this.isAuthenticated) {
      this.auth.getUser().subscribe(data => this.user = data);
      this.moneyUser.getUserBalance().subscribe((number: number) => {
        this.money = number;
      });
    }
    this.isSmallScreen$.subscribe(isSmallScreen => {
      this.isSmallScreenBool = isSmallScreen;
    });
  }

}
