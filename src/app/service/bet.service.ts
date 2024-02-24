import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {FormGroup, FormBuilder} from '@angular/forms';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AuthService} from "./auth.service";
import { UserBetSummary } from '../model';

@Injectable({
  providedIn: 'root'
})
export class BetService {
  private listBets = new BehaviorSubject<FormGroup[]>([]);
  listBets$ = this.listBets.asObservable();

  constructor(private fb: FormBuilder, private http: HttpClient, private authService: AuthService) {
  }

  addData(data: any) {
    const newFormGroup = this.fb.group({
      matchId: [data.matchId],
      homeTeam: [data.homeTeam],
      awayTeam: [data.awayTeam],
      placedAt: [data.placedAt],
      betOdds: [data.betOdds],
      betAmount: [data.betAmount],
      winner: [data.winner],
    });

    const newList = [...this.listBets.value, newFormGroup];
    this.listBets.next(newList);
  }

  sendDataToBackend() {
    const plainData = this.listBets.value.map(formGroup => formGroup.getRawValue());
    const userId = this.authService.userId!; // Retrieve userId from AuthService

    // Map matchId from string to integer
    const modifiedData = plainData.map(item => ({
      ...item,
      matchId: parseInt(item.matchId) // Parse matchId to integer
    }));

    // Construct query parameters
    let params = new HttpParams();
    params = params.set('userId', userId);

    return this.http.post<any>('/api/bet', modifiedData, { params });
  }

  cancelBet(betId: number) {
    let params = new HttpParams();
    params = params.set('betId', betId);

    return this.http.delete<any>('/api/user/bet', { params })
  }

  getBetHistory() {
    const userId = this.authService.userId!;
    let params = new HttpParams();
    params = params.set('userId', userId);

    return this.http.get<any>('/api/user/bets', { params });
  }

  setBetAmount(form: FormGroup, newAmount: number) {
    form.get('betAmount')?.setValue(newAmount)
  }

  deleteForm(form: FormGroup) {
    const updatedList = this.listBets.value.slice();
    const index = updatedList.findIndex((updatedListForm) => updatedListForm === form);

    if (index !== -1) {
      updatedList.splice(index, 1);
      this.listBets.next(updatedList);
    }
  }

  deleteList() {
    this.listBets.next([])
  }
}

