import {Component, OnInit} from '@angular/core';
import {User} from "../model";
import {AuthService} from "../auth.service";
import { MoneyUserService } from '../money-user.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  isAuthenticated!: boolean;
  user!: User;
  money: number;
  constructor(public auth: AuthService, private moneyUser: MoneyUserService ) {
  }
  
  async ngOnInit() {
    this.isAuthenticated = await this.auth.isAuthenticated();
    await this.auth.getUser().subscribe(data => this.user = data);
    this.moneyUser.getMoney().subscribe((number) => {
      this.money = number;
    });
  }
}
