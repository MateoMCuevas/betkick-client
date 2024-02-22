import {Injectable} from '@angular/core';
import {catchError, Observable, of, tap} from "rxjs";
import {Competition, CompetitionStandings, Match, UserBetSummary} from "../model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  competitionsUrl: string = 'https://betkick-api.leandroruhl.com:8080/api/active-competitions';
  competitionsWithStandingsUrl: string = 'https://betkick-api.leandroruhl.com:8080/api/competitions-with-standings';
  matchesUrl: string = 'https://betkick-api.leandroruhl.com:8080/api/matches';
  standingsUrl: string = 'https://betkick-api.leandroruhl.com:8080/api/standings'
  matches: Match[] = [];


  constructor(private http: HttpClient) {
  }

  getActiveCompetitions(): Observable<Competition[]> {
    return this.http.get<Competition[]>(this.competitionsUrl)
      .pipe(
        catchError(this.handleError<Competition[]>('getActiveCompetitions', []))
      );
  }

  getCompetitionsWithStandings(): Observable<Competition[]> {
    return this.http.get<Competition[]>(this.competitionsWithStandingsUrl)
      .pipe(
        catchError(this.handleError<Competition[]>('getCompetitionsWithStandings', []))
      );
  }

  getMatches(): Observable<Match[]> {
    if (this.matches.length > 0) {
      // If matches is not empty, return it immediately
      return of(this.matches);
    }

    const url = this.matchesUrl;

    return this.http.get<Match[]>(url)
      .pipe(
        tap((data) => {
          this.matches = data;
        }),
        catchError(this.handleError<Match[]>('getMatches', []))
      );
  }

  getStandings(competitionId?: number): Observable<CompetitionStandings[]> {
    const url = this.standingsUrl + `?competitionId=${competitionId}`;
    return this.http.get<CompetitionStandings[]>(url)
      .pipe(
        catchError(this.handleError<CompetitionStandings[]>('getStandings', []))
      );
  }

  getLeaderboard(competitionId?: number): Observable<UserBetSummary[]> {
    return this.http.get<UserBetSummary[]>('https://betkick-api.leandroruhl.com:8080/api/leaderboard')
      .pipe(
        catchError(this.handleError<UserBetSummary[]>('getLeaderboard', []))
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
}
