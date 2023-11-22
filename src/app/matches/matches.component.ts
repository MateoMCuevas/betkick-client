import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { EventService } from "../event.service";
import { BetService } from "../bet.service"
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from "rxjs";
import {Match} from "../model";

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
    homeTeam: [''],
    awayTeam: [''],
    placedAt: [''],
    betOdds: [''],
    betAmount: [''], // Puedes dejarlo vacío
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
    const valores = {
      homeTeam: match.homeTeam.shortName,
      awayTeam: match.awayTeam.shortName,
      placedAt: null,
      betOdds: odds.toString(),
      betAmount: null,
      winner: this.whoWin(match,event),
    };
    this.form.patchValue(valores);
    this.betService.addData(this.form.value);
    this.form.reset();
  }

  whoWin(match: Match, event: MouseEvent): any {
    const buttonId = (event.target as HTMLButtonElement)?.id;
    switch (buttonId) {
      case 'localWin':
        return match.homeTeam.shortName
        break;
      case 'draw':
        return 'draw'
        break;
      case 'awayWin':
        return match.awayTeam.shortName
        break;
    }
  }

  //goBack(): void {
  // this.location.back();
  //}

  protected readonly Math = Math;
  protected readonly parseFloat = parseFloat;
}
