import {Component, OnInit} from '@angular/core';
import {User} from "../../model";
import {MoneyUserService} from '../../services/money-user.service';
import {AuthService} from "../../services/auth.service";
import {BreakpointObserver} from "@angular/cdk/layout";
import {map} from "rxjs";

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
      this.user = this.auth.getUser();
      this.moneyUser.getUserBalance().subscribe((response) => {
        this.money = response.data;
      });
    }
    this.isSmallScreen$.subscribe(isSmallScreen => {
      this.isSmallScreenBool = isSmallScreen;
    });
  }

  getUserBalance() {
    this.moneyUser.getUserBalance().subscribe(response => {
      this.money = response.data;
    });
  }


}
