import { Component ,OnInit} from '@angular/core';
import { BetService } from '../service/bet.service';
import { AuthService } from '../service/auth.service';
import { User } from '../model';

@Component({
  selector: 'app-my-bets',
  templateUrl: './my-bets.component.html',
  styleUrls: ['./my-bets.component.css']
})
export class MyBetsComponent implements OnInit{
  myFinishedBets: any[]
  myActivedBets: any[]
  myLivedBets: any[]
  isAuthenticated!: boolean;
  user!: User;
  money: number;
  constructor(public auth: AuthService,
              private betService: BetService) {}

  async ngOnInit() {
    this.isAuthenticated = await this.auth.isAuthenticated();
    await this.auth.getUser().subscribe(data => this.user = data);
    this.getBetHistory()
  }

  getBetHistory() {
      this.betService.getBetHistory().subscribe(
        (response) => {
          this.myActivedBets=response.filter(function(bet: any ){
            return bet.match.status =='SCHEDULED' || bet.match.status=='TIMED'||bet.match.status=='CANCELLED'||bet.match.status=='POSTPONED'||bet.match.status=='SUSPENDED'
          })
          this.myFinishedBets=response.filter(function(bet: any ){
            return bet.match.status =='FINISHED' ||bet.match.status =='AWARED'
          })
          this.myLivedBets=response.filter(function(bet: any ){
            return bet.match.status =='IN_PLAY' ||bet.match.status =='PAUSED'
          })
        },
        (error) => {
          console.error('An error occurred: ', error);
        }
      );
    }
    getDate(utcDate: any): string{
      const partes = utcDate.split('T');
      const fecha = partes[0];
      const horayseg = partes[1];
      let hora=horayseg.split('.')[0]
      if(hora.substring(0, 2)== 0o0){
        hora='SIN DEFINIR'
      }
      return `${fecha} HORA: ${hora}`

    }


}
