import {Component, OnInit} from '@angular/core';
import {User} from "../model";
import {MoneyUserService} from '../service/money-user.service';
import {AuthService} from "../service/auth.service";
import {BetService} from "../service/bet.service";

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  isAuthenticated!: boolean;
  user!: User;
  money: number;

  constructor(public auth: AuthService,
              private moneyUser: MoneyUserService) {
  }

  async ngOnInit() {
    this.isAuthenticated = await this.auth.isAuthenticated();
    if (this.isAuthenticated) {
      this.auth.getUser().subscribe(data => this.user = data);
      this.moneyUser.getUserBalance().subscribe((number: number) => {
        this.money = number;
      });
    }
  }

}
