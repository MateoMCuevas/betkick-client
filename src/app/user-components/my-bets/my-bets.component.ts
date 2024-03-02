import {Component, OnInit} from '@angular/core';
import {BetService} from '../../services/bet.service';
import {AuthService} from '../../services/auth.service';
import {User} from '../../model';
import {MoneyUserService} from '../../services/money-user.service';
import {from} from "rxjs";

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
  selectedListType: number = 0;
  isAuthenticated!: boolean;
  user!: User;
  money: number;

  constructor(public auth: AuthService,
              private betService: BetService,
              private moneyService: MoneyUserService) {
  }

  async ngOnInit() {
    this.isAuthenticated = await this.auth.isAuthenticated();
    this.user = this.auth.getUser();
    this.getBetHistory()
  }

  getBetHistory() {
    from(this.betService.getBetHistory())
      .subscribe(
        (response) => {
          this.myActiveBets = response.data.filter(function (bet: any) {
            return bet.match.status == 'SCHEDULED' || bet.match.status == 'TIMED' || bet.match.status == 'CANCELLED' || bet.match.status == 'POSTPONED' || bet.match.status == 'SUSPENDED'
          })
          this.myFinishedBets = response.data.filter(function (bet: any) {
            return bet.match.status == 'FINISHED' || bet.match.status == 'AWARDED'
          })
          this.myLiveBets = response.data.filter(function (bet: any) {
            return bet.match.status == 'IN_PLAY' || bet.match.status == 'PAUSED'
          })
          this.showList(1)
        },
        (error) => {
          console.error('An error occurred in my-bets: ', error);
        }
      );
  }

  cancelBet(bet: any, index: number) {
    from(this.betService.cancelBet(bet.id))
      .subscribe((number: number) => {
        this.money = number;
      });
    this.selectedList.splice(index, 1)
    this.moneyService.setMoney(this.money)
    this.moneyService.showAlertMsj('The bet was successfully cancelled')
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

  protected readonly encodeURI = encodeURI;
}
