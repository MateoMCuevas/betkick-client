import {Component, OnInit} from '@angular/core';
import {User} from "../model";
import { MoneyUserService } from '../money-user.service';
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
              private moneyUser: MoneyUserService,
              private betService: BetService) {}

  async ngOnInit() {
    this.isAuthenticated = await this.auth.isAuthenticated();
    await this.auth.getUser().subscribe(data => this.user = data);
    this.moneyUser.getMoney().subscribe((number) => {
      this.money = number;
    });
  }

  getBetHistory() {
      this.betService.getBetHistory().subscribe(
        (response) => {
          console.log("Backend's response: ", response);
        },
        (error) => {
          console.error('An error occurred: ', error);
        }
      );
    }
}
