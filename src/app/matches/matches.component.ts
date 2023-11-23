import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {EventService} from "../service/event.service";
import {BetService} from "../service/bet.service"
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from "rxjs";
import {Match, Winner} from "../model";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  matches: Match[] = [];

  bet1 = parseFloat((Math.random() * (4.0 - 1.0) + 1.0).toFixed(1));
  betX = parseFloat((Math.random() * (4.0 - 1.0) + 1.0).toFixed(1));
  bet2 = parseFloat((Math.random() * (4.0 - 1.0) + 1.0).toFixed(1));

  form = this.fb.group({
    matchId: [''],
    homeTeam: [''],
    awayTeam: [''],
    betOdds: [''],
    betAmount: [''],
    winner: [''],
  });

  constructor(
    private eventService: EventService,
    private fb: FormBuilder,
    private betService: BetService,
    private route: ActivatedRoute) {
    //private location: Location) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      const competitionId = id !== 0 ? id : undefined;
      this.getMatches(competitionId);
    });
  }

  getMatches(competitionId?: number): void {
    this.eventService.getMatches(competitionId)
      .subscribe(matches => {
        this.matches = matches;
      });
  }
  handleButtonClick(match: Match, odds: number, event: MouseEvent): void {
    let listBetsLenght: number = 0
    this.betService.listBets$.subscribe((datos) => {
      let listBets: any = datos;
      listBetsLenght = (listBets as FormArray).length;
    });
    if (listBetsLenght < 10) {
      const valores = {
        matchId: match.id.toString(),
        homeTeam: match.homeTeam.shortName,
        awayTeam: match.awayTeam.shortName,
        placedAt: null,
        betOdds: odds.toString(),
        betAmount: null,
        winner: this.whoWins(match, event),
      };
      if (valores.winner) {
        console.log(valores.winner);
        this.form.patchValue(valores);
        this.betService.addData(this.form.value);
      }
      this.form.reset();
    }else{
      //mandar alerta
    }
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

  //goBack(): void {
  // this.location.back();
  //}

  protected readonly Math = Math;
  protected readonly parseFloat = parseFloat;
}
