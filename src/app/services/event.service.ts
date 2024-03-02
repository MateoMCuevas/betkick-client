import {Injectable} from '@angular/core';
import {catchError, from, map, Observable, of, tap} from "rxjs";
import {Competition, CompetitionStandings, Match, UserBetSummary} from "../model";
import {AxiosService} from "./axios.service";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  competitionsUrl: string = '/api/active-competitions';
  competitionsWithStandingsUrl: string = '/api/competitions-with-standings';
  matchesUrl: string = '/api/matches';
  standingsUrl: string = '/api/standings'
  matches: Match[] = [];

  constructor(private axiosService: AxiosService) {
  }

  getActiveCompetitions() {
    const apiUrl = this.competitionsUrl;

    // Make the request using the custom request method
    return from(this.axiosService.request('get', apiUrl))
      .pipe(
        catchError(this.handleError<Competition[]>('getActiveCompetitions', []))
      );
  }


  getCompetitionsWithStandings() {
    const apiUrl = this.competitionsWithStandingsUrl;

    // Make the request using the custom request method
    return from(this.axiosService.request('get', apiUrl))
      .pipe(
        catchError(this.handleError<Competition[]>('getCompetitionsWithStandings', []))
      );
  }

  getMatches() {
    if (this.matches.length > 0) {
      // If matches is not empty, return it immediately
      return of(this.matches);
    }

    const apiUrl = this.matchesUrl;

    // Make the request using the custom request method
    return from(this.axiosService.request('get', apiUrl))
      .pipe(
        tap((response) => {
          this.matches = response.data;
        }),
        map(response => response.data),
        catchError(this.handleError<Match[]>('getMatches', []))
      );
  }

  getStandings(competitionId?: number) {
    const apiUrl = this.standingsUrl + `?competitionId=${competitionId}`;

    // Make the request using the custom request method
    return from(this.axiosService.request('get', apiUrl))
      .pipe(
        catchError(this.handleError<CompetitionStandings[]>('getStandings', []))
      );
  }

  getLeaderboard(competitionId?: number) {
    const apiUrl = '/api/leaderboard';

    // Make the request using the custom request method
    return from(this.axiosService.request('get', apiUrl))
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
