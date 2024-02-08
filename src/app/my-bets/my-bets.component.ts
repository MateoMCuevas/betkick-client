import { Component, OnInit } from '@angular/core';
import { BetService } from '../service/bet.service';
import { AuthService } from '../service/auth.service';
import { User } from '../model';
import { MoneyUserService } from '../service/money-user.service';

@Component({
  selector: 'app-my-bets',
  templateUrl: './my-bets.component.html',
  styleUrls: ['./my-bets.component.css']
})
export class MyBetsComponent implements OnInit {
  selectedList: any[] = []
  myFinishedBets: any[] = []
  myActiveBets: any[] = []
  myLiveBets: any[] = []
  MyBets: any[] = []
  selectedListType: number = 0;
  isAuthenticated!: boolean;
  user!: User;
  money: number;
  constructor(public auth: AuthService,
    private betService: BetService,
    private moneyService: MoneyUserService) { }

  async ngOnInit() {
    this.isAuthenticated = await this.auth.isAuthenticated();
    await this.auth.getUser().subscribe(data => this.user = data);
    this.getBetHistory()
  }

  getBetHistory() {
    this.betService.getBetHistory().subscribe(
      (response) => {
        this.myActiveBets = response.filter(function (bet: any) {
          return bet.match.status == 'SCHEDULED' || bet.match.status == 'TIMED' || bet.match.status == 'CANCELLED' || bet.match.status == 'POSTPONED' || bet.match.status == 'SUSPENDED'
        })
        this.myFinishedBets = response.filter(function (bet: any) {
          return bet.match.status == 'FINISHED' || bet.match.status == 'AWARED'
        })
        this.myLiveBets = response.filter(function (bet: any) {
          return bet.match.status == 'IN_PLAY' || bet.match.status == 'PAUSED'
        })

      },
      (error) => {
        console.error('An error occurred in my-bets: ', error);
      }
    );
  }

  cancelBet(bet: any) {
    this.betService.cancelBet(bet.id).subscribe((number: number) => {
      this.money = number;
    });
    this.moneyService.setMoney(this.money)
    this.moneyService.showAlertMsj('THE BET WAS SUCCESSFULLY CANCELED')
  }

  adjustedDate(utcDateString: string): Date {
    const utcDate = new Date(utcDateString);
    utcDate.setHours(utcDate.getHours() - 3);
    return utcDate;
  }

  showList(listType: number): void {
    this.selectedListType = listType;
    this.updateList()
  }
  updateList(): void {
    switch (this.selectedListType) {
      case 1:
        this.selectedList = this.myActiveBets;
        break;
      case 2:
        this.selectedList = this.myLiveBets;
        break;
      case 3:
        this.selectedList = this.myFinishedBets;
        break;
      default:
        this.selectedList = [];
        break;
    }
  }

  isListEmpty(): boolean {
    return this.selectedList.length === 0;
  }

  calculateEarnings(amount: number, odds: number): number {
    return Number((amount * odds).toFixed(2))
  }
  successfulBet(bet: any): boolean {
    if (bet.winner === 'DRAW' && bet.match.score.home === bet.match.score.away) {
      return true
    }
    else if (bet.winner === 'HOME_TEAM' && bet.match.score.home > bet.match.score.away) {
      return true
    }
    else if (bet.winner === 'AWAY_TEAM' && bet.match.score.away > bet.match.score.home) {
      return true
    } else {
      return false
    }
  }
}
