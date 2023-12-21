import { Component ,OnInit} from '@angular/core';
import { BetService } from '../service/bet.service';
import { AuthService } from '../service/auth.service';
import { User } from '../model';
import { MoneyUserService } from '../service/money-user.service';

@Component({
  selector: 'app-my-bets',
  templateUrl: './my-bets.component.html',
  styleUrls: ['./my-bets.component.css']
})
export class MyBetsComponent implements OnInit{
  myFinishedBets: any[]
  myActiveBets: any[]
  myLiveBets: any[]
  MyBets: any[]
  isAuthenticated!: boolean;
  user!: User;
  money: number;
  constructor(public auth: AuthService,
              private betService: BetService,
              private moneyService:MoneyUserService) {}

  async ngOnInit() {
    this.isAuthenticated = await this.auth.isAuthenticated();
    await this.auth.getUser().subscribe(data => this.user = data);
    this.getBetHistory()
  }
  getMyBets(){
    this.betService.getBetHistory().subscribe(
      (response)=>{
        this.MyBets=response;
      },
      (error) => {
        console.error('An error occurred: ', error);
      }
    );
  }
  getBetHistory() {
      this.betService.getBetHistory().subscribe(
        (response) => {
          this.myActiveBets=response.filter(function(bet: any ){
            return bet.match.status =='SCHEDULED' || bet.match.status=='TIMED'||bet.match.status=='CANCELLED'||bet.match.status=='POSTPONED'||bet.match.status=='SUSPENDED'
          })
          this.myFinishedBets=response.filter(function(bet: any ){
            return bet.match.status =='FINISHED' ||bet.match.status =='AWARED'
          })
          this.myLiveBets=response.filter(function(bet: any ){
            return bet.match.status =='IN_PLAY' ||bet.match.status =='PAUSED'
          })
          
        },
        (error) => {
          console.error('An error occurred: ', error);
        }
      );
    }

    cancelBet(bet: any){
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
}
