import {Component, OnInit} from '@angular/core';
import {catchError, map, Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

interface Competition {
  name: string;
  emblem: string;
}

@Component({
  selector: 'app-competitions-list',
  templateUrl: './competitions-list.component.html',
  styleUrls: ['./competitions-list.component.css']
})
export class CompetitionsListComponent implements OnInit {
  competitions: Competition[] = [];
  url: string = 'http://localhost:8080/api/competitions'

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getCompetitions()
      .subscribe(competitions => this.competitions = competitions);
  }

  getCompetitions(): Observable<Competition[]> {
    return this.http.get<Competition[]>(this.url)
      .pipe(
        catchError(this.handleError<Competition[]>('getCompetitions', []))
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
