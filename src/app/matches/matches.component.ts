import {Component, OnInit} from '@angular/core';
import {EventService} from "../service/event.service";
import {BetService} from "../service/bet.service"
import {ActivatedRoute} from "@angular/router";
import {DatePipe} from "@angular/common";
import {FormArray, FormBuilder} from '@angular/forms';
import {Match} from "../model";
import {isSameWeek} from 'date-fns';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css'],
  providers: [DatePipe]
})
export class MatchesComponent implements OnInit {
  matches: Match[] = [];

  liveMatches: Match[] = [];
  todayMatches: Match[] = [];
  weekMatches: Match[][] = [];
  weekIndex: number[] = [];
  selectedWeek: number;

  pageSize = 5; // Set the number of items per page
  pageIndex = 0; // Current page index
  pageSizeOptions = [5, 10, 20]; // Options for the user to choose page size

  searchMatches: Match[] = [];
  competition: string = "";
  inputMatch: string = "";
  urlActual = window.location.href;

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
    private route: ActivatedRoute,
  ) {
    //private location: Location) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      const competitionId = id !== 0 ? id : undefined;
      this.getMatches(competitionId);
    });
  }

  get paginatedData(): any[] {
    const startIndex = this.pageIndex * this.pageSize;
    return this.weekMatches[this.selectedWeek].slice(startIndex, startIndex + this.pageSize);
  }

  pageChanged(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  search() {
    this.searchResults(this.inputMatch);
  }

  searchResults(team: string) {
    this.searchMatches.length = 0;
    let homeTeam: string = "";
    let awayTeam: string = "";
    team = team.toLowerCase();
    console.log(team);
    this.matches.forEach(element => {
      homeTeam = element.awayTeam.name.toLowerCase();
      awayTeam = element.homeTeam.name.toLowerCase();
      if (homeTeam.includes(team) || awayTeam.includes(team)) {
        this.searchMatches.push(element);
      }
    });

  }
  getMatches(competitionId?: number): void {
    this.eventService.getMatches(competitionId)
      .subscribe(matches => {
        this.matches = matches;
        this.competition = matches[1].competition.name;
        this.matches.sort((a, b) => this.compareDates(a.utcDate, b.utcDate));
        this.matches = this.matches.filter(function (match: any) {
          return match.status != 'FINISHED' && match.status != 'AWARDED'
        })
        this.matches.forEach(match => {
          this.roundToOneDecimal(match);
        })
        this.matchFilter()
      });
    this.eventService.getLeaderboard()
    .subscribe(leaderboard =>{
      console.log(leaderboard);

    })
  }

  compareDates(date1: string, date2: string): number {
    const dateA = new Date(date1);
    const dateB = new Date(date2);
    return dateA.getTime() - dateB.getTime();
  }

  handleButtonClick(eventData: any): void {
    const { match, odds, winnerTeam } = eventData;
    let listBetsLength: number = 0
    this.betService.listBets$.subscribe((datos) => {
      let listBets: any = datos;
      listBetsLength = (listBets as FormArray).length;
    });
    if (listBetsLength < 10) {
      const valores = {
        matchId: match.id.toString(),
        homeTeam: match.homeTeam.shortName,
        awayTeam: match.awayTeam.shortName,
        placedAt: null,
        betOdds: odds.toString(),
        betAmount: null,
        winner: winnerTeam,
      };
      if (valores.winner) {
        console.log(valores.winner);
        this.form.patchValue(valores);
        this.betService.addData(this.form.value);
      }
      this.form.reset();
    } else {
      //mandar alerta
    }
  }

  matchFilter() {
    this.liveMatches = [];
    this.todayMatches = [];
    this.weekMatches = [];

    const uniqueWeeks = new Set<number>();

    this.matches.forEach((match: any) => {
      if (match.status == 'IN_PLAY' || match.status == 'PAUSED') {
        this.liveMatches.push(match);
      } else if (this.isTodayMatch(match)) {
        this.todayMatches.push(match);
      } else {
        const weekNumber = this.getWeekNumber(match.utcDate);

        uniqueWeeks.add(weekNumber);

        if (!this.weekMatches[weekNumber]) {
          this.weekMatches[weekNumber] = [];
        }

        this.weekMatches[weekNumber].push(match);
      }
    });
    this.weekIndex = Array.from(uniqueWeeks).sort((a, b) => a - b);
  }

  onWeekSelected(selectedWeek: number) {
    this.selectedWeek = selectedWeek;
  }

  getWeekNumber(date: string): number {
    const matchDate = new Date(date);
    const currentDate = new Date();

    const diffInTime = matchDate.getTime() - currentDate.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    return Math.floor(diffInDays / 7);
  }


  isTodayMatch(match: Match): boolean {
    const todayDate = new Date();
    const matchDate = new Date(match.utcDate)
    return (
      todayDate.getUTCFullYear() === matchDate.getUTCFullYear() &&
      todayDate.getUTCMonth() === matchDate.getUTCMonth() &&
      todayDate.getUTCDate() === matchDate.getUTCDate()
    );
  }

  isThisWeekMatch(match: Match): boolean {
    const currentDate = new Date();
    const matchDate = new Date(match.utcDate)
    return isSameWeek(matchDate, currentDate);
  }

  roundToOneDecimal(match: Match): void {
    match.odds.homeWinsOdds = Math.round(match.odds.homeWinsOdds * 10) / 10;
    match.odds.awayWinsOdds = Math.round(match.odds.awayWinsOdds * 10) / 10;
    match.odds.drawOdds = Math.round(match.odds.drawOdds * 10) / 10;
  }
  protected readonly Math = Math;
  protected readonly parseFloat = parseFloat;
}
