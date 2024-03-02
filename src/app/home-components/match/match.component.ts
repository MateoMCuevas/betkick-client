import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Match, Winner} from 'src/app/model';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent {
  @Input() match: Match
  @Output() oddsButtonClick = new EventEmitter<any>();

  handleButtonClick(match: any, odds: number, event: MouseEvent): void {
    const winnerTeam = this.whoWins(match, event);
    this.oddsButtonClick.emit({match, odds, winnerTeam});
  }

  whoWins(match: Match, event: MouseEvent): any {
    const buttonId = (event.target as HTMLButtonElement)?.id;
    switch (buttonId) {
      case 'localWinSpan':
      case 'localWin':
        return Winner.HOME_TEAM.toString();
      case 'drawSpan':
      case 'draw':
        return Winner.DRAW.toString();
      case 'awayWinSpan':
      case 'awayWin':
        return Winner.AWAY_TEAM.toString();
    }
  }

}
