import {Component, OnInit} from '@angular/core';
import {User} from "../model";
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

  constructor(public auth: AuthService, private betService: BetService) {
  }

  async ngOnInit() {
    this.isAuthenticated = await this.auth.isAuthenticated();
    await this.auth.getUser().subscribe(data => this.user = data);
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
