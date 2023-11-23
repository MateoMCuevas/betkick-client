import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NumberBetService {

  private numberSubject = new BehaviorSubject<number>(0);
  number$ = this.numberSubject.asObservable();

  setNumberBet(number: number) {
    this.numberSubject.next(number);
  }
}
