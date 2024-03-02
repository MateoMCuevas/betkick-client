import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from "./auth.service";
import {AxiosService} from "./axios.service";

@Injectable({
  providedIn: 'root'
})
export class BetService {
  private listBets = new BehaviorSubject<FormGroup[]>([]);
  listBets$ = this.listBets.asObservable();

  constructor(private fb: FormBuilder, private axiosService: AxiosService, private authService: AuthService) {
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

    // Construct the URL
    const apiUrl = '/api/bet';

    // Make the request using the custom request method
    return this.axiosService.request('post', apiUrl, modifiedData, {userId});
  }

  cancelBet(betId: number) {
    const apiUrl = '/api/user/bet';
    let params = {betId: betId};

    // Make the request using the custom request method
    return this.axiosService.request('delete', apiUrl, null, params);
  }

  getBetHistory() {
    const apiUrl = '/api/user/bets';
    const userId = this.authService.userId!;
    let params = {userId: userId};

    // Make the request using the custom request method
    return this.axiosService.request('get', apiUrl, null, params);
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

