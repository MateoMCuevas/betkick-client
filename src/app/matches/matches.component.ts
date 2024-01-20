import {Component, OnInit, ViewChild} from '@angular/core';
import {EventService} from "../service/event.service";
import {BetService} from "../service/bet.service"
import {ActivatedRoute} from "@angular/router";
import {DatePipe} from "@angular/common";
import {FormArray, FormBuilder} from '@angular/forms';
import {Match} from "../model";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css'],
  providers: [DatePipe]
})
export class MatchesComponent implements OnInit {
  @ViewChild('paginator') paginator!: MatPaginator;
  matches: Match[] = [];

  liveMatches: Match[] = [];
  todayMatches: Match[] = [];
  weekMatches: Match[][] = [];
  weekIndex: number[] = [];
  selectedWeek: number;

  pageSize = 5; // Set the number of items per page
  pageIndex = 0; // Current page index
  pageSizeOptions = [5, 9, 18]; // Options for the user to choose page size

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
        this.filterMatches()
      });
  }

  compareDates(date1: string, date2: string): number {
    const dateA = new Date(date1);
    const dateB = new Date(date2);
    return dateA.getTime() - dateB.getTime();
  }

  handleButtonClick(eventData: any): void {
    const {match, odds, winnerTeam} = eventData;
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
        this.form.patchValue(valores);
        this.betService.addData(this.form.value);
      }
      this.form.reset();
    } else {
      //mandar alerta
    }
  }

  filterMatches() {
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

  // skip empty weeks
  nextWeek(week: number) {
    if (this.weekMatches[week] === undefined || this.weekMatches[week].length === 0) {
      week++;
      for (week; week < this.weekMatches.length; week++) {
        if (this.weekMatches[week].length > 0)
          break;
      }
    }

    this.onWeekSelected(week);
  }

  // skip empty weeks
  prevWeek(week: number) {
    if (this.weekMatches[week] === undefined || this.weekMatches[week].length === 0) {
      week--;
      for (week; week >= 0; week--) {
        if (this.weekMatches[week].length > 0)
          break;
      }
    }

    this.onWeekSelected(week);
  }

  onWeekSelected(selectedWeek: number) {

    if (selectedWeek >= 0 && selectedWeek < this.weekMatches.length) {
      this.selectedWeek = selectedWeek;

      // Update the paginator length
      if (this.paginator) {
        this.paginator.length = this.weekMatches[selectedWeek].length;
      }

      // Set the page index to 0
      if (this.paginator) {
        this.paginator.pageIndex = 0;

        // Manually trigger a page change event
        this.paginator.page.emit({
          pageIndex: 0,
          pageSize: this.paginator.pageSize,
          length: this.paginator.length
        });
      }
    }
  }


  getWeekNumber(date
                  :
                  string
  ):
    number {
    const matchDate = new Date(date);
    const currentDate = new Date();

    // Calculate the difference in days
    const diffInTime = matchDate.getTime() - currentDate.getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);

    // Adjust for the day of the week (Sunday is 0, Monday is 1, ..., Saturday is 6)
    const dayOfWeek = (currentDate.getDay() + 6) % 7;
    const adjustedDiffInDays = diffInDays + dayOfWeek;

    // Calculate the week number
    return Math.floor(adjustedDiffInDays / 7);
  }


  getButtonText(week: number) {
    if (week == 0) {
      return 'This week';
    } else if (week == 1) {
      return 'Next week';
    } else {
      return `In ${week} weeks`;
    }
  }

  isTodayMatch(match
                 :
                 Match
  ):
    boolean {
    const todayDate = new Date();
    const matchDate = new Date(match.utcDate)
    return (
      todayDate.getUTCFullYear() === matchDate.getUTCFullYear() &&
      todayDate.getUTCMonth() === matchDate.getUTCMonth() &&
      todayDate.getUTCDate() === matchDate.getUTCDate()
    );
  }

  roundToOneDecimal(match
                      :
                      Match
  ):
    void {
    match.odds.homeWinsOdds = Math.round(match.odds.homeWinsOdds * 10) / 10;
    match.odds.awayWinsOdds = Math.round(match.odds.awayWinsOdds * 10) / 10;
    match.odds.drawOdds = Math.round(match.odds.drawOdds * 10) / 10;
  }
}
