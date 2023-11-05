import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";

interface Team {
  "name": string;
  "shortName": string;
  "tla": string;
  "crest": string;
}

interface Competition {
  name: string;
  emblem: string;
}

interface Score {
  home: number;
  away: number;
}

interface Match {
  "score": Score;
  "utcDate": string;
  "competition": Competition;
  "homeTeam": Team;
  "awayTeam": Team;
}

@Component({
  selector: 'app-matches-list',
  templateUrl: './matches-list.component.html',
  styleUrls: ['./matches-list.component.css']
})
export class MatchesListComponent implements OnInit {
  matches: Match[] = [];
  url: string = 'http://localhost:8080/api/matches'

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getMatches()
      .subscribe(matches => this.matches = matches.reverse());
  }

  getMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(this.url)
      .pipe(
        catchError(this.handleError<Match[]>('getCompetitions', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      alert(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  protected readonly Math = Math;
  protected readonly parseFloat = parseFloat;
}
