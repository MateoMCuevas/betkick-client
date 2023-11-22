import {Component,Input} from '@angular/core';
import {BetService} from "../bet.service"
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-card-match',
  templateUrl: './card-match.component.html',
  styleUrls: ['./card-match.component.css']
})
export class CardMatchComponent {
  @Input() listBets: any = null;
  betAmount: number=0;
  cardDelete: boolean= false;

  constructor(
    private betService: BetService
  ){}

  setBetAmount(form: FormGroup,event:any){
    const nuevoMonto=(parseFloat((event.target as HTMLInputElement).value));
    this.betService.setBetAmount(form,nuevoMonto);
  }

  calculatePotProfits( form: FormGroup): number {
    const betAmount= parseFloat(form.get('betAmount')?.value ?? 0);
    const betOdds= parseFloat(form.get('betOdds')?.value);
    return Number((betAmount * betOdds).toFixed(2));
  }

  deleteBet(form: FormGroup)
  {
    this.betService.deleteForm(form);
  }
}


