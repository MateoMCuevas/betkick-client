import {Injectable} from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {Competition, Match} from "./interfaces";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventService {
  competitionsUrl: string = 'http://localhost:8080/api/competitions';
  matchesUrl: string = 'http://localhost:8080/api/matches';

  constructor(private http: HttpClient) {
  }

  getCompetitions(): Observable<Competition[]> {
    return this.http.get<Competition[]>(this.competitionsUrl)
      .pipe(
        catchError(this.handleError<Competition[]>('getCompetitions', []))
      );
  }

  getMatches(competitionId?: number): Observable<Match[]> {
    const url = this.matchesUrl +
      (competitionId !== undefined ? `?competitionId=${competitionId}` : '');
    return this.http.get<Match[]>(url)
      .pipe(
        catchError(this.handleError<Match[]>('getMatches', []))
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
